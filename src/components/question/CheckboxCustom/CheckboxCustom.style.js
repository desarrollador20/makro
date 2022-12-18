import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../../utils";



export const styles = StyleSheet.create({

    containerCheckbox: {
        borderRadius: 10,
    },

    containerTitleCheckbox: {
        flex: 1,
        flexDirection: 'row',
    },

    textActiveConforme: {
        flex: 4,
        fontSize: RFPercentage(2.5),
        marginLeft: normalize(8, 'height')
    },

    containerIconCheckbox: {

    },

    iconStyle: {
        alignSelf: 'flex-end',
    },

    imageLogo: {
        height: normalize(90, 'height'),
        width: normalize(80, 'width'),
        resizeMode: "contain",
    },

    containerAsnwerWithIMG: {
        alignItems: 'center',
    },

    checkboxWithIMG: {
        alignItems: 'center',
        marginBottom: -7
    },

    containerAnswerWithIMGmargin: {
        margin: normalize(10),
        borderRadius: 10,
        borderWidth: 1
    },

    labelAnswerWithIMG: {
        alignSelf: 'center',
        fontFamily: 'kodchasan-extraLight',
        color: '#999999',
        fontSize: RFPercentage(2.5),
        marginBottom: normalize(25)
    }


});
