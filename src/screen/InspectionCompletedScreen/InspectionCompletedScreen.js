import React from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Image, Button } from 'react-native-elements';
import normalize from 'react-native-normalize';
import CustomerHeader from '../../navigation/CustomerHeader';
import { screen, stylesGlobal, theme } from '../../utils';
import { styles } from './InspectionCompletedScreen.style';

export function InspectionCompletedScreen(props) {
    const { route } = props;
    const navigation = useNavigation();

    return (
        <SafeAreaView style={stylesGlobal.contentGlobal}>
            <CustomerHeader />

            <Image
                source={require("../../../assets/img/login_logo.png")}
                style={styles.image}
            />
            <View style={styles.container}>
                <Text style={styles.lblTitle}>A inspeção foi enviada de forma satisfatória</Text>
                <Button
                    title={`Salir`}
                    titleStyle={styles.fontCustom}
                    containerStyle={stylesGlobal.btnContainer}
                    buttonStyle={{ ...stylesGlobal.btn, marginTop: normalize(30), alignSelf: 'center', width: '85%', backgroundColor: '#E25D62' }}
                    onPress={() => navigation.navigate(screen.home.tab, { screen: screen.home.home })}
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