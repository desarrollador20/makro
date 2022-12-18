import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { theme } from "./theme";

export const stylesGlobal = StyleSheet.create({
  contentGlobal: {
    flex: 1,
    backgroundColor: theme.GlobalColorsApp.background,
  },
  contentView: {
    paddingHorizontal: normalize(20, 'width'),
  },
  containerButton: {
    flexDirection: 'row'
  },
  btnContainer: {
    paddingVertical: normalize(20, 'height'),
    paddingHorizontal: normalize(10, 'width'),
  },
  btn: {
    height: normalize(50, 'width'),
    width: normalize(140, 'width'),
    borderRadius: 10,
  },
});


