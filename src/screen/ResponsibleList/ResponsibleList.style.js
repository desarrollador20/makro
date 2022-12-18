import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../utils";



export const styles = StyleSheet.create({

    container: {
        marginHorizontal: normalize(35),
        marginBottom: normalize(40)
    },

    containerHeader: {
        marginBottom: normalize(30)
    },

    lblTitle: {
        fontFamily: 'kodchasan-regular',
        fontSize: RFPercentage(2.7),
        textAlign: 'center',
        color: theme.GlobalColorsApp.lblGrayPrimary
    },

    containerList: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalize(20),
        borderWidth: 1,
        borderColor: theme.GlobalColorsApp.btnGray,
        borderRadius: 10,
        padding: normalize(10)
    },

    nameList: {
        fontFamily: 'kodchasan-regular',
        flex: 3
    },

    iconList: {
        flex: 1
    },

    emulateStyleCombo: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.GlobalColorsApp.btnGray,
        borderRadius: 10,

        marginTop: normalize(10),

    },
});
