import { useContext } from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { ExpensesContext } from "../store/ExpensesContext";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensePeriod="last 1 week"
      fallbackText="No expenses"
    />
  );
};
export default AllExpenses;
