import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { stylesGlobal, theme } from "../../../utils";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        borderWidth: 1.3,
        borderColor: "#FFD7BE",
        marginBottom: normalize(20, 'height'),
        paddingHorizontal: normalize(15, 'height'),
        paddingVertical: normalize(6, 'height')
    },


    containerIcon: {
        flex: 1,
        alignSelf: 'center',
        borderRadius: 5,
    },

    containerLabels: {
        flex: 5,
        paddingLeft: normalize(10),
    },

    iconMain: {
        padding: normalize(10, 'width'),
    },

    lblCategoryName: {
        fontFamily: 'kodchasan-extraLight',
        alignSelf: 'flex-end',
        fontSize: RFPercentage(3),
    },

    lblNumQuestions: {
        fontFamily: 'kodchasan-extraLight',
        alignSelf: 'flex-end',
        fontSize: RFPercentage(2),
        color: '#999999'
    },

    progressBar: {
        backgroundColor: theme.GlobalColorsApp.ProgressBarInactive
    }
});
