import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import CustomButton from "../../UI/CustomButton";
import Input from "./Input";

const ExpenseForm = ({
  onCancel,
  submitButtonLable,
  onSubmit,
  defaultValues,
}) => {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInput((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };
    const isValidAmount = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isValidDate = expenseData.date.toString() !== "Invalid Date";
    const isValidDesc = expenseData.description.trim().length > 0;
    if (isValidAmount && isValidDate && isValidDesc) {
      onSubmit(expenseData);
    } else {
      setInput((curInput) => {
        return {
          amount: { value: curInput.amount.value, isValid: isValidAmount },
          date: { value: curInput.date.value, isValid: isValidDate },
          description: {
            value: curInput.description.value,
            isValid: isValidDesc,
          },
        };
      });
      //Alert.alert("Invalid Input", "Please check your input value");
    }
  };
  const isFormIsValid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.formContainer}>
        <Input
          labelname="Amount"
          invalid={!input.amount.isValid}
          style={styles.multiInput}
          textnputConfig={{
            keyboardType: "decimal-pad",
            value: input.amount.value,
            onChangeText: inputChangeHandler.bind(this, "amount"),
          }}
        />
        <Input
          labelname="Date"
          invalid={!input.date.isValid}
          style={styles.multiInput}
          textnputConfig={{
            keyboardType: "default",
            placeholder: "YYYY-MM-DD",
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: input.date.value,
          }}
        />
      </View>
      <Input
        labelname="Description"
        invalid={!input.description.isValid}
        textnputConfig={{
          keyboardType: "default",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: input.description.value,
          multiline: true,
          autoCorrect: true,
        }}
      />
      {isFormIsValid && (
        <Text style={styles.errorText}> Please check all the input data</Text>
      )}
      <View style={styles.buttons}>
        <CustomButton style={styles.button} mode="flat" onPress={onCancel}>
          Clear
        </CustomButton>
        <CustomButton
          style={styles.button}
          mode="nonflat"
          onPress={submitHandler}
        >
          {submitButtonLable}
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  multiInput: {
    flex: 1,
  },
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
export default ExpenseForm;
