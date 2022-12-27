import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/ExpensesContext";
import { getDateMinusDays } from "../utils/dateUtil";
import { fetchExpenses } from "../utils/httpUtil";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Error occured while fetching data");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);
  const last7daysExpenses = expensesCtx?.expenses?.filter((expense) => {
    const toDay = new Date();
    const date7DaysAgo = getDateMinusDays(toDay, 7);
    return expense.date > date7DaysAgo;
  });

  const errorHandler = () => {
    setError(null);
  };
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <ExpensesOutput
      expenses={last7daysExpenses}
      expensePeriod="last 2 week"
      fallbackText="No recent expenses"
    />
  );
};
export default RecentExpenses;
