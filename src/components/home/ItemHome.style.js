import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { stylesGlobal, theme } from "../../utils";


export const styles = StyleSheet.create({
  item: {
    flex: 1,
    width: "95%",
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    // justifyContent:'space-between',
    borderWidth: 1.3,
    marginBottom: normalize(20, 'height'),
    paddingHorizontal: normalize(15, 'height'),
    paddingVertical: normalize(15, 'height')
  },

  containerIcon: {
    flex: 1,
    alignSelf: 'center',
    borderRadius: 5
  },

  containerLabels: {
    flex: 5, alignSelf: 'center',
    paddingLeft: normalize(10),
  },

  containerArrow: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-end',
  },

  lblNumQuestions: {
    fontFamily: 'kodchasan-extraLight',
    fontSize: Platform.OS === 'ios' ? RFPercentage(1.6) : RFPercentage(1.8),
    color: '#999999'
  },

  iconMain: {
    padding: Platform.OS === 'ios' ? normalize(5, 'height') : normalize(10, 'height'),
  },

  lblCategoryName: {
    fontFamily: 'kodchasan-bold',
    fontSize: Platform.OS === 'ios' ? RFPercentage(2.0) : RFPercentage(2.2),
  }
});
