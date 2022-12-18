import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { stylesGlobal, theme } from "../../../utils";


export const styles = StyleSheet.create({

   headerRed: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: normalize(1, 'height'),
      borderWidth: 1,
      borderColor: theme.GlobalColorsApp.lblRedPrimary,
      alignItems: 'center',
      height: normalize(50, 'width'),
      backgroundColor: theme.GlobalColorsApp.lblRedFourth,
   },

   lblHeaderRed: {
      fontFamily: 'kodchasan-extraLight',
      fontSize: RFPercentage(3.2),
      color: theme.GlobalColorsApp.lblRedPrimary,
      marginLeft: normalize(10, 'height'),
   },



});
