import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../../utils";

export const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    width: "100%",
    height: normalize(150, 'width'),
    marginTop: normalize(40, 'height'),

  },

  imageLogo: {
    resizeMode: "contain",
    width: normalize(100, 'width'),
    height: normalize(100, 'width'),
  },

  lblTitle: {
    fontFamily: 'kodchasan-extraLight',
    fontSize: RFPercentage(3.5),
    textAlign: 'center',
    marginTop: normalize(10, 'height'),
    color: theme.GlobalColorsApp.lblRedSecondary,
    marginBottom: normalize(10, 'height')
  },

  lblTitleRadio: {
    fontFamily: 'kodchasan-extraLight',
  },

  lblSubTitle: {
    fontFamily: 'kodchasan-extraLight',
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
    paddingHorizontal: normalize(15, 'width'),
    color: theme.GlobalColorsApp.lblGrayPrimary,
    marginBottom: normalize(20, 'height'),
    //opacity: 0.7
  },



  lblSubTitleLink: {
    fontFamily: 'kodchasan-extraLight',
    color: theme.GlobalColorsApp.lblRedTertiary,
    fontSize: RFPercentage(2.5),
    marginBottom: Platform.OS === 'ios' ? normalize(-1, 'height') : normalize(-6, 'height'),
    paddingLeft: Platform.OS === 'ios' ? normalize(18) : normalize(2)
  },

  content: {
    marginHorizontal: normalize(20, 'height'),
  },

  containerLogo: {
    alignSelf: 'center'
  },

  containerRadioLanguageGlobal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(5)
  },

  containerRadioLanguageP: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: normalize(50)
  },

  containerRadioLanguageE: {
    flexDirection: 'row',
    alignItems: 'center',

  },

  lblRadio: {
    fontFamily: 'kodchasan-extraLight',
  },

  containerSwith: {
    width: "85%",
    fontFamily: 'kodchasan-extraLight',
    color: theme.GlobalColorsApp.lblRedTertiary,
  },

  containerSelector: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(15),
    marginTop: normalize(5),
  }


});
