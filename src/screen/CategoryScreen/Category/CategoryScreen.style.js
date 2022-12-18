import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { stylesGlobal, theme } from "../../../utils";


export const styles = StyleSheet.create({

  container: {

  },
  titleCategory: {
    fontFamily: 'kodchasan-regular',
    fontSize: RFPercentage(2.5),
    color: theme.GlobalColorsApp.btnGray,
    alignSelf: 'center',
    marginBottom: normalize(15, 'height'),
    marginTop: normalize(-30, 'height')

  },

  textModal: {
    fontFamily: 'kodchasan-regular',
    fontSize: RFPercentage(2.6),
    marginTop: normalize(20, 'height'),
    textAlign: 'center',
    color: '#5A8C70'
  },
  fontCustom: {
    fontFamily: 'kodchasan-extraLight',
  },



});
