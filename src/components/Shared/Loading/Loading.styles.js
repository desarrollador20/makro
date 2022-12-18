import { StyleSheet } from "react-native";
import { theme } from "../../../utils";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: theme.GlobalColorsApp.lblRedPrimary,
    fontFamily: 'kodchasan-extraLight',
    textTransform: "uppercase",
    marginTop: 10,
  },
});
