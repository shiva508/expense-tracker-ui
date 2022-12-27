import axios from "axios";

const BACKEND_URL =
  "https://react-native-cource-da846-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function storeExpenseData(expenseDate) {
  const storedExpense = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseDate
  );

  const id = storedExpense.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseDate) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseDate);
}
export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
