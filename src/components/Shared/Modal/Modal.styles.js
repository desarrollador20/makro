import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

export const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    top:normalize(100,'height'),
    position:'absolute',
    width: "85%",
    backgroundColor: "#fff",
  },
});
