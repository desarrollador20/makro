import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { stylesGlobal, theme } from "../../utils";


export const styles = StyleSheet.create({

    textArea: {
        fontFamily: 'kodchasan-extraLight',
        height: normalize(170),
        textAlignVertical: 'top',
        borderWidth: 1,
        padding: normalize(10, 'height'),
        borderColor: theme.GlobalColorsApp.btnGrayPrev,
        marginTop: normalize(10),
        marginBottom: normalize(20)
    },

    container: {
        paddingHorizontal: normalize(40),
        marginTop: normalize(10)
    },

    lblMain: {
        fontFamily: 'kodchasan-regular',
        fontSize: RFPercentage(2.8),
        textAlign: 'center',
        color: '#5A8C70',
        marginBottom: normalize(25)
    },

    lblSecondary: {
        color: theme.GlobalColorsApp.lblGrayPrimary
    },

    containerValidationError: {
        color: theme.GlobalColorsApp.lblGrayPrimary
    },

    lblValidationError: {
        fontSize: RFPercentage(2),
        color: theme.GlobalColorsApp.lblRedPrimary,
        marginTop: normalize(-15)
    }
});
