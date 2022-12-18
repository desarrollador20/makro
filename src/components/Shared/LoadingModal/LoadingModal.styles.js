import { StyleSheet } from "react-native";
import { theme } from "../../../utils";

export const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: theme.GlobalColorsApp.lblRedPrimary,
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
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
