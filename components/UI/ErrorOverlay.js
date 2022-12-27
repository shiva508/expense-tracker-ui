import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import CustomButton from "./CustomButton";

const ErrorOverlay = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Error occured</Text>
      <Text style={styles.text}>{message}</Text>
      <CustomButton onPress={onConfirm}>Oky</CustomButton>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
export default ErrorOverlay;
