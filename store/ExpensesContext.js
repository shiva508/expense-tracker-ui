import { createContext, useReducer } from "react";

// const DUMMY_EXPENSE = [
//   {
//     id: "a",
//     description: "bought pen",
//     amount: 15.1,
//     date: new Date("2022-12-25"),
//   },
//   {
//     id: "b",
//     description: "bought Sprite",
//     amount: 10.0,
//     date: new Date("2022-12-19"),
//   },
//   {
//     id: "c",
//     description: "bought cacke",
//     amount: 200.09,
//     date: new Date("2022-12-01"),
//   },
//   {
//     id: "d",
//     description: "bought pen",
//     amount: 15.1,
//     date: new Date("2022-12-25"),
//   },
//   {
//     id: "e",
//     description: "bought Sprite",
//     amount: 10.0,
//     date: new Date("2022-12-19"),
//   },
//   {
//     id: "f",
//     description: "bought cacke",
//     amount: 200.09,
//     date: new Date("2022-12-01"),
//   },
//   {
//     id: "g",
//     description: "bought pen",
//     amount: 15.1,
//     date: new Date("2022-12-25"),
//   },
//   {
//     id: "h",
//     description: "bought Sprite",
//     amount: 10.0,
//     date: new Date("2022-12-19"),
//   },
//   {
//     id: "i",
//     description: "bought cacke",
//     amount: 200.09,
//     date: new Date("2022-12-01"),
//   },
//   {
//     id: "j",
//     description: "bought pen",
//     amount: 15.1,
//     date: new Date("2022-12-25"),
//   },
//   {
//     id: "k",
//     description: "bought Sprite",
//     amount: 10.0,
//     date: new Date("2022-12-19"),
//   },
//   {
//     id: "l",
//     description: "bought cacke",
//     amount: 200.09,
//     date: new Date("2022-12-01"),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  removeExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
});
const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const updatableExpensesIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpenses = state[updatableExpensesIndex];
      const updatedItem = { ...updatableExpenses, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpensesIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);
  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const removeExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };
  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    removeExpense: removeExpense,
    updateExpense: updateExpense,
    setExpenses: setExpenses,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
