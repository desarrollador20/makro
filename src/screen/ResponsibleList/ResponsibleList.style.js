import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme, stylesGlobal } from "../../utils";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: normalize(35),
    marginBottom: normalize(40),
  },

  containerHeader: {
    marginBottom: normalize(30),
  },

  lblTitle: {
    fontFamily: "kodchasan-regular",
    fontSize: RFPercentage(2.7),
    textAlign: "center",
    color: theme.GlobalColorsApp.lblGrayPrimary,
  },

  containerList: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(20),
    borderWidth: 1,
    borderColor: theme.GlobalColorsApp.btnGray,
    borderRadius: 10,
    padding: normalize(10),
    backgroundColor: "#f2f2f2",
    marginBottom: normalize(20),
  },

  nameList: {
    fontFamily: "kodchasan-regular",
    flex: 3,
  },

  iconList: {
    flex: 1,
  },

  emulateStyleCombo: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.GlobalColorsApp.btnGray,
    borderRadius: 10,

    marginTop: normalize(10),
  },
  headerRed: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: normalize(1, "height"),
    borderWidth: 1,
    borderColor: theme.GlobalColorsApp.lblRedPrimary,
    alignItems: "center",
    height: normalize(50, "width"),
    backgroundColor: theme.GlobalColorsApp.lblRedFourth,
  },

  lblHeaderRed: {
    fontFamily: "kodchasan-extraLight",
    fontSize: RFPercentage(3.2),
    color: theme.GlobalColorsApp.lblRedPrimary,
    marginLeft: normalize(10, "height"),
  },
  item: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    // justifyContent:'space-between',
    borderWidth: 1.3,
    marginBottom: normalize(20, "height"),
    paddingHorizontal: normalize(15, "height"),
    paddingVertical: normalize(15, "height"),
  },

  containerIcon: {
    flex: 1,
    alignSelf: "center",
    borderRadius: 5,
  },

  containerLabels: {
    flex: 5,
    alignSelf: "center",
    paddingLeft: normalize(10),
  },

  containerArrow: {
    flex: 1,
    alignSelf: "center",
    alignItems: "flex-end",
  },

  lblNumQuestions: {
    fontFamily: "kodchasan-extraLight",
    fontSize: Platform.OS === "ios" ? RFPercentage(1.6) : RFPercentage(1.8),
    color: "#999999",
  },

  iconMain: {
    // padding: Platform.OS === 'ios' ? normalize(5, 'height') : normalize(10, 'height'),
  },

  lblCategoryName: {
    fontFamily: "kodchasan-bold",
    fontSize: Platform.OS === "ios" ? RFPercentage(2.0) : RFPercentage(2.2),
  },
});
