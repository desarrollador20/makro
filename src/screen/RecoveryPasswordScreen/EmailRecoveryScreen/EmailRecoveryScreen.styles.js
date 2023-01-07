import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../../utils";

export const styles = StyleSheet.create({
  lblTitle: {
    fontFamily: "kodchasan-extraLight",
    fontSize: RFPercentage(3.5),
    textAlign: "center",
    marginTop: normalize(10, "height"),
    color: theme.GlobalColorsApp.lblRedSecondary,
    marginBottom: normalize(10, "height"),
  },

  image: {
    resizeMode: "contain",
    width: "100%",
    height: normalize(150, "width"),
    marginTop: normalize(40, "height"),
  },

  imageLogo: {
    resizeMode: "contain",
    width: normalize(100, "width"),
    height: normalize(100, "width"),
  },

  lblTitleRadio: {
    fontFamily: "kodchasan-extraLight",
  },

  lblSubTitle: {
    fontFamily: "kodchasan-extraLight",
    fontSize: RFPercentage(2.5),
    textAlign: "center",
    paddingHorizontal: normalize(15, "width"),
    color: theme.GlobalColorsApp.lblGrayPrimary,
    marginBottom: normalize(20, "height"),
    //opacity: 0.7
  },

  lblSubTitleLink: {
    fontFamily: "kodchasan-extraLight",
    color: theme.GlobalColorsApp.lblRedTertiary,
  },

  content: {
    marginHorizontal: normalize(20, "height"),
  },

  containerLogo: {
    alignSelf: "center",
  },

  containerRadioLanguageGlobal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: normalize(5),
  },

  containerRadioLanguageP: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: normalize(50),
  },

  containerRadioLanguageE: {
    flexDirection: "row",
    alignItems: "center",
  },

  lblRadio: {
    fontFamily: "kodchasan-extraLight",
  },

  containerSwith: {
    width: "85%",
    fontFamily: "kodchasan-extraLight",
    color: theme.GlobalColorsApp.lblRedTertiary,
  },

  containerSelector: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: normalize(15),
    marginTop: normalize(5),
  },
  btn: {
    height: normalize(50, "width"),
    width: normalize(270, "width"),
    borderRadius: 10,
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: normalize(150, "width"),
    marginTop: normalize(100, "height"),
  },
  icon: {
    padding: 0,
    marginTop: -2,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: normalize(10, "width"),
    borderColor: "#70707059",
  },
  containerLogo: {
    alignSelf: "center",
    marginTop: normalize(60, "height"),
  },
});
