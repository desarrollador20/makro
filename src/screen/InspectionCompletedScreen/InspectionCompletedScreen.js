import React from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Image, Button } from 'react-native-elements';
import normalize from 'react-native-normalize';
import CustomerHeader from '../../navigation/CustomerHeader';
import { lng, screen, stylesGlobal, theme } from '../../utils';
import { styles } from './InspectionCompletedScreen.style';

export function InspectionCompletedScreen(props) {
    const { route } = props;
    const navigation = useNavigation();
    const { t } = lng.useTranslation();

    return (
        <SafeAreaView style={stylesGlobal.contentGlobal}>
            <CustomerHeader t={t} />

            <Image
                source={require("../../../assets/img/login_logo.png")}
                style={styles.image}
            />
            <View style={styles.container}>
                <Text style={styles.lblTitle}>{t("InspeccionComplete.title")}</Text>
                <Button
                    title={t("InspeccionComplete.back")}
                    titleStyle={styles.fontCustom}
                    containerStyle={stylesGlobal.btnContainer}
                    buttonStyle={{ ...stylesGlobal.btn, marginTop: normalize(30), alignSelf: 'center', width: '85%', backgroundColor: '#E25D62' }}
                    onPress={() => navigation.navigate(screen.detectLocation.tab, { screen: screen.detectLocation.home })}
                />


            </View>
            <View style={{ alignItems: 'center', position: 'absolute', bottom: 10, alignSelf: 'center' }}>
                <Image
                    source={require("../../../assets/img/logoPulse.png")}
                    style={styles.imageFooter}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
        </SafeAreaView>
    )
}