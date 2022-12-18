import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../../utils";


export const styles = StyleSheet.create({

    container: {
        marginHorizontal: normalize(30),
        marginTop: normalize(25),
        backgroundColor: theme.GlobalColorsApp.colorContainerPreviousInspection,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.GlobalColorsApp.colorTextPreviousInspection,
        paddingHorizontal: normalize(15),
        paddingVertical: normalize(10),
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    containerHistorial: {
        marginHorizontal: normalize(30),
        marginTop: normalize(25),
        paddingBottom: normalize(25),
        backgroundColor: theme.GlobalColorsApp.colorContainerPreviousInspection,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.GlobalColorsApp.colorTextPreviousInspection,
        flex: 1,
        flexDirection: 'column',
    },

    row: {
        flexDirection: 'row',
        paddingHorizontal: normalize(15),
        justifyContent: 'space-between',
        marginTop: normalize(10)
    },

    rowColumn: {
        paddingHorizontal: normalize(15),
        marginTop: normalize(10)
    },

    lblQuestionHistory: {
        fontFamily: 'kodchasan-regular',
        color: theme.GlobalColorsApp.colorTextPreviousInspection
    },

    lblResponseHistory: {
        fontFamily: 'kodchasan-extraLight',
        color: theme.GlobalColorsApp.colorOptionInactive
    },

    iconTitle: {

    },

    lblSubTitleQuestion: {
        fontFamily: 'kodchasan-regular',
        fontSize: RFPercentage(2.8),
        color: theme.GlobalColorsApp.colorTextPreviousInspection,
        marginRight: normalize(25),
    },

    containerCheckbox: {
        borderRadius: 10,
        backgroundColor: 'green',
        flex: 1,

    },

    containerTitleCheckbox: {
        flex: 3,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: normalize(5, 'height'),
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center'
    },

    textActiveConforme: {
        fontFamily: 'kodchasan-regular',
        flex: 4,
        fontSize: RFPercentage(1.8),
        marginLeft: normalize(8, 'height'),
        alignContent: 'center',
        alignItems: 'center'
    },

    containerIconCheckbox: {
        flex: 1
    },

    iconStyle: {
        alignSelf: 'flex-end',
    }

});
