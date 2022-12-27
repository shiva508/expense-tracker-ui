import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles } from "../constants/styles";
import ManageExpenses from "../screens/ManageExpenses";
import ExpensesBottomTapNav from "./ExpensesBottomTapNav";

const Stack = createNativeStackNavigator();
const ExpenseNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="expensesbottomtapnav"
          component={ExpensesBottomTapNav}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="manageexpenses"
          component={ManageExpenses}
          options={{ title: "Manage Expenses", presentation: "modal" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default ExpenseNavigation;
