import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../../utils";



export const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    lblQuestion: {
        fontFamily: 'kodchasan-regular',
        fontSize: RFPercentage(2.5),
        textAlign: 'center',
        paddingHorizontal: normalize(8, 'height'),
        color: theme.GlobalColorsApp.colorQuestion,
        marginBottom: normalize(10, 'height')
    },

    containerCheckbox: {
        borderRadius: 10,
    },

    containerTitleCheckbox: {
        flex: 1,
        flexDirection: 'row'
    },

    textActiveConforme: {
        flex: 4,
        fontSize: RFPercentage(2.5),
        marginLeft: normalize(8, 'height')
    },

    containerIconCheckbox: {
        flex: 1
    },

    iconStyle: {
        alignSelf: 'flex-end',
    },

    containerIcon: {
        marginRight: normalize(10)
    },

    miniaturaStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
        backgroundColor: 'red'
    },

    viewImage: {
        marginTop: normalize(10),
        paddingVertical: normalize(10),
        marginHorizontal: normalize(30),
        backgroundColor: "#EDEDED",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: 'center'
    },

    lblUploadImage: {
        fontFamily: 'kodchasan-regular',
        fontSize: RFPercentage(2),
    },

    containerImagesUpload: {
        marginTop: normalize(10),
        marginHorizontal: normalize(30),
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }




});
