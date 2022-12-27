import { StatusBar } from "expo-status-bar";
import ExpenseNavigation from "./navigation/ExpenseNavigation";
import ExpensesContextProvider from "./store/ExpensesContext";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <ExpenseNavigation />
      </ExpensesContextProvider>
    </>
  );
}
