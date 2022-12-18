import { StyleSheet, Platform } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../utils";

export const styles = StyleSheet.create({

    Header: {
        height: Platform.OS === 'ios' ? normalize(50, 'height') : normalize(60, 'height'),
        backgroundColor: theme.GlobalColorsApp.background,
        marginRight: normalize(15, 'width')
    },

    containerTitle: {
        flex: 1,
        flexDirection: 'row'
    },

    containerAvatar: {
        marginTop: Platform.OS === 'ios' ? normalize(18) : 0,
        backgroundColor: '#000000'
    },

    textContainerName: {
        fontFamily: 'kodchasan-extraLight',
        alignSelf: 'center',
        fontSize: RFPercentage(2.5),
        color: '#999999',
        marginLeft: normalize(10, 'width')
    },

    textName: {
        fontFamily: 'kodchasan-extraLight',
        color: '#333333'
    },

    containerLogo: {
        height: normalize(70, 'height'),
        width: normalize(70, 'width'),
        resizeMode: "contain"
    }
});
