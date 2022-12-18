import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../utils";



export const styles = StyleSheet.create({

    container: {
        marginHorizontal: normalize(35),
        marginBottom: normalize(40),
        flexDirection: 'column',
    },


    image: {
        resizeMode: "contain",
        width: "100%",
        height: normalize(150, 'width'),
        marginTop: normalize(40, 'height'),
    },

    imageFooter: {
        resizeMode: "contain",
        alignSelf: 'center',
        width: normalize(100, 'width'),
        height: normalize(60, 'width'),
        alignSelf: 'center',
        alignItems: 'center'
    },

    lblTitle: {
        fontFamily: 'kodchasan-regular',
        fontSize: RFPercentage(3.5),
        textAlign: 'center',
        marginTop: normalize(20)
    },

    fontCustom: {
        fontFamily: 'kodchasan-extraLight',
    },



});
