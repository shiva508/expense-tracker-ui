import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GlobalStyles } from "../constants/styles";
import AllExpenses from "../screens/AllExpenses";
import RecentExpenses from "../screens/RecentExpenses";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/UI/IconButton";

const BottomTab = createBottomTabNavigator();
const ExpensesBottomTapNav = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            iconname="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("manageexpenses");
            }}
          />
        ),
      })}
    >
      <BottomTab.Screen
        name="recentexpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size}></Ionicons>
          ),
        }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="allexpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size}></Ionicons>
          ),
        }}
      ></BottomTab.Screen>
    </BottomTab.Navigator>
  );
};
export default ExpensesBottomTapNav;
