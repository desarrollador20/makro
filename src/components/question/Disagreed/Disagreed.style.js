import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../../utils";


export const styles = StyleSheet.create({

   container: {
      marginTop: normalize(15)
   },

   headerRed: {

      flexDirection: 'row',
      paddingLeft: normalize(30, 'width'),
      borderWidth: 1,
      marginTop: normalize(10),
      borderColor: theme.GlobalColorsApp.lblRedPrimary,
      alignItems: 'center',
      height: normalize(40, 'width'),
      backgroundColor: theme.GlobalColorsApp.lblRedFourth,
   },

   headerSubTitleQuestion: {
      flexDirection: 'row',
      paddingLeft: normalize(30, 'width'),
      alignItems: 'center',
      marginTop: normalize(10),
   },


   lblHeaderRed: {
      fontFamily: 'kodchasan-extraLight',
      fontSize: RFPercentage(2.8),
      color: theme.GlobalColorsApp.lblRedPrimary,
      marginLeft: normalize(5, 'height'),
   },

   lblSubTitleQuestion: {
      fontFamily: 'kodchasan-extraLight',
      fontSize: Platform.OS === 'ios' ? RFPercentage(1.8) : RFPercentage(2.2),
      color: theme.GlobalColorsApp.btnGrayPrev,
      marginLeft: normalize(5, 'height'),
      marginRight: normalize(25)
      //marginRight:normalize(15),
      //  paddingHorizontal: normalize(20),
   },

   containerQuestion: {

   },

   textArea: {
      fontFamily: 'kodchasan-extraLight',
      height: normalize(120),
      textAlignVertical: 'top',
      borderWidth: 1,
      padding: normalize(10, 'height'),
      borderColor: theme.GlobalColorsApp.lblRedPrimary,
      marginHorizontal: normalize(30),
      marginTop: normalize(10),
      marginBottom: normalize(20)
   },

   containerRiskAalysis: {
      // backgroundColor: 'green',
      flexDirection: 'row',
      alignItems: 'center'
   },

   SwitchStyle: {
      alignSelf: 'flex-start',
      marginLeft: normalize(20),
      marginRight: normalize(7)
   },

   labelSwicht: {
      fontFamily: 'kodchasan-regular',
      fontSize: RFPercentage(2.5),
   },

   iconSwicht: {
      marginLeft: normalize(30),

   },

   headerRedRisk: {
      flexDirection: 'row',
      paddingLeft: normalize(30, 'width'),
      borderWidth: 1,
      marginTop: normalize(10),
      marginHorizontal: normalize(30),
      paddingVertical: normalize(10),
      paddingHorizontal: normalize(50),
      borderColor: theme.GlobalColorsApp.lblRedPrimary,
      alignItems: 'center',
      height: 'auto',
      backgroundColor: theme.GlobalColorsApp.lblRedFourth,
   },

   lblHeaderRedSwicht: {
      fontFamily: 'kodchasan-extraLight',
      fontSize: RFPercentage(2.5),
      color: theme.GlobalColorsApp.lblRedPrimary,
      marginLeft: normalize(5, 'height'),
      marginLeft: normalize(10)
   },

   emulateStyleCombo: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.GlobalColorsApp.lblRedPrimary,
      borderRadius: 10,
      marginHorizontal: normalize(30),
      marginTop: normalize(10),

   },

   containerValidationError: {

   },

   lblValidationError: {
      fontSize: RFPercentage(2),
      color: theme.GlobalColorsApp.lblRedPrimary,
      marginTop: normalize(-15)
   }

});
