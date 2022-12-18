import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { stylesGlobal, theme } from "../../../utils";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    lblTitleMap: {
        fontFamily: 'kodchasan-extraLight',
        marginTop: normalize(20),
        marginBottom: normalize(20, 'height'),
        fontSize: RFPercentage(3),
        color: theme.GlobalColorsApp.btnGray,

    },

    map: {
        width: normalize(300, 'width'),
        height: normalize(400, 'height'),
    },

    textModal: {
        fontFamily: 'kodchasan-extraLight',
        fontSize: RFPercentage(2.8),
        color: theme.GlobalColorsApp.lblRedPrimary,
        textAlign: 'center',
        marginHorizontal: normalize(20, 'width'),
        marginTop: normalize(20, 'height')
    },

    containerModal: {
        flexDirection: 'column',
        height: normalize(270, 'height'),
        justifyContent: 'space-around'
    },

    btnModal: {
        ...stylesGlobal.btn,
        backgroundColor: theme.GlobalColorsApp.btnRed,
        width: '100%',
        textAlign: 'center',
    },

    headerDetect: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: normalize(1, 'height'),
        alignItems: 'center',
        marginTop: normalize(15, 'height'),
        marginBottom: normalize(10, 'height'),
        height: normalize(50, 'width'),
    },

    lblHeaderDetect: {
        fontFamily: 'kodchasan-regular',
        fontSize: RFPercentage(3.2),
        color: theme.GlobalColorsApp.btnGray,
        marginLeft: normalize(5, 'height'),
    },

    fontCustom: {
        fontFamily: 'kodchasan-extraLight',
    },



});
