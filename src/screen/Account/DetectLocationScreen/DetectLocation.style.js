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

    lblInput: {
        fontFamily: 'kodchasan-regular',
        fontSize: RFPercentage(3.2),
        color: theme.GlobalColorsApp.lblGrayPrimary,
        marginLeft: normalize(5, 'height')
    },

    lblHeaderRed: {
        fontFamily: 'kodchasan-extraLight',
        fontSize: RFPercentage(3.2),
        color: theme.GlobalColorsApp.lblRedPrimary,
        marginLeft: normalize(5, 'height'),
    },

    containerLblInput: {
        flexDirection: 'row',
        marginLeft: normalize(20),
    },

    containerForm: {
        marginHorizontal: normalize(30),
        marginTop: normalize(50)
    },

    input: {
        fontFamily: 'kodchasan-extraLight',
        height: normalize(40, 'height'),
        margin: normalize(12, 'width'),
        borderWidth: 1,
        padding: normalize(10),
        borderColor: theme.GlobalColorsApp.btnGrayPrev,
    },

    startInspection: {
        ...stylesGlobal.btn,
        backgroundColor: theme.GlobalColorsApp.btnRed,
        width: '85%',
        textAlign: 'center',
        alignSelf: 'center'
    },

    fontCustom: {
        fontFamily: 'kodchasan-extraLight',
    },


});
