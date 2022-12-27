import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm from "../components/expenses/manageexpence/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/ExpensesContext";
import {
  deleteExpense,
  storeExpenseData,
  updateExpense,
} from "../utils/httpUtil";

const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const [isReqInprogress, setIsReqInprogress] = useState(false);
  const [error, setError] = useState();
  const editedExpanseId = route?.params?.expenseId;
  const isEditing = !!editedExpanseId;

  const selectedExpanse = expensesCtx.expenses.find(
    (expanse) => expanse.id === editedExpanseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expanse" : "Add Expanse",
    });
  }, [navigation, isEditing]);

  const deleteExpanseHandler = async () => {
    setIsReqInprogress(true);
    try {
      await deleteExpense(editedExpanseId);
      expensesCtx.removeExpense(editedExpanseId);
      navigation.goBack();
    } catch (error) {
      setError("Error occured on delete");
      setIsReqInprogress(false);
    }
  };

  const cancleHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    try {
      if (isEditing) {
        setIsReqInprogress(true);
        await updateExpense(editedExpanseId, expenseData);
        expensesCtx.updateExpense(editedExpanseId, expenseData);
      } else {
        setIsReqInprogress(true);
        const id = await storeExpenseData(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Error occured on save/update");
      setIsReqInprogress(false);
    }
  };
  const errorHandler = () => {
    setError(null);
  };

  if (error && !isReqInprogress) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isReqInprogress) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancleHandler}
        submitButtonLable={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpanse}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            iconname="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpanseHandler}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
export default ManageExpenses;
