import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { RFPercentage } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
    containerFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: normalize(16),
        marginTop: normalize(40, 'height'),
        marginBottom: normalize(20, 'height')
    },

    containerExit: {
        width: '50%',
        marginLeft: normalize(30, 'height'),
    },

    lblExit: {
        fontFamily: 'kodchasan-extraLight',
        color: '#AFA3A3',
        fontSize: RFPercentage(3),
    },

    containerLogo: {
        width: '50%',
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        marginRight: normalize(30, 'height'),
    },

    imageLogo: {
        height: normalize(70, 'height'),
        width: normalize(70, 'width'),
        resizeMode: "contain",
    }


});
