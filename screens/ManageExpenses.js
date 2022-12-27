import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpenseForm from "../components/expenses/manageexpence/ExpenseForm";
import CustomButton from "../components/UI/CustomButton";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/ExpensesContext";

const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
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

  const deleteExpanseHandler = () => {
    expensesCtx.removeExpense(editedExpanseId);
    navigation.goBack();
  };

  const cancleHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData) => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpanseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };
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
