import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme, stylesGlobal } from "../../../utils";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize(10, 'height'),
  },

  input: {
    width: "100%",
    //fontFamily: 'kodchasan-extraLight',
    marginTop: normalize(5, 'height'),
    borderRadius: 30,

  },

  fontCustom: {
    fontFamily: 'kodchasan-extraLight',
  },

  icon: {
    color: "red",
  },

  inputRN: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },


  lblSubTitleTwo: {
    fontFamily: 'kodchasan-extraLight',
    fontSize: RFPercentage(2.5),
    color: theme.GlobalColorsApp.lblRedSecondary,
    alignSelf: 'flex-end',
    marginRight: normalize(10, 'width')
  },

  btnLogin: {
    ...stylesGlobal.btn,
    backgroundColor: theme.GlobalColorsApp.btnGray,
    width: '85%',
    textAlign: 'center',
    alignSelf: 'center'
  },

  containerValidationError: {
    flex: 1,
    alignItems: 'center',
  },

  lblValidationError: {
    fontFamily: 'kodchasan-extraLight',
    fontSize: RFPercentage(2),
    color: theme.GlobalColorsApp.lblRedPrimary,
    marginTop: normalize(-15)
  }




});
