import { useContext } from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { ExpensesContext } from "../store/ExpensesContext";
import { getDateMinusDays } from "../utils/dateUtil";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const last7daysExpenses = expensesCtx?.expenses.filter((expense) => {
    const toDay = new Date();
    const date7DaysAgo = getDateMinusDays(toDay, 7);
    return expense.date > date7DaysAgo;
  });
  return (
    <ExpensesOutput
      expenses={last7daysExpenses}
      expensePeriod="last 2 week"
      fallbackText="No recent expenses"
    />
  );
};
export default RecentExpenses;
