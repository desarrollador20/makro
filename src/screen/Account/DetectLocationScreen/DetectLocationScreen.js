import React from 'react';
import { View, Text, SafeAreaView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { useNavigation } from "@react-navigation/native";
import { Footer } from '../../../components';
import CustomerHeader from '../../../navigation/CustomerHeader';
import { screen, stylesGlobal, theme } from "../../../utils";
import { styles } from "./DetectLocation.style";
import { useTranslation } from "react-i18next";


export function DetectLocationScreen() {

    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={stylesGlobal.contentGlobal}>
                <CustomerHeader />
                <View style={styles.headerRed}>
                    <Icon type="foundation" name="marker" color={theme.GlobalColorsApp.lblRedPrimary} size={normalize(35)} />
                    <Text style={styles.lblHeaderRed}>Detectar localização22</Text>
            
                </View>

                <View style={styles.containerForm}>

                    <View style={styles.containerLblInput}>
                        <Icon type="foundation" name="marker" color={theme.GlobalColorsApp.lblGrayPrimary} size={normalize(35)} />
                        <Text style={styles.lblInput}>BU/País</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        selectionColor={theme.GlobalColorsApp.btnRed}
                        placeholder="Brasil"
                    />

                    <View style={{ ...styles.containerLblInput, marginTop: normalize(30, 'height') }}>
                        <Icon type="ionicon" name="business-outline" color={theme.GlobalColorsApp.lblGrayPrimary} size={normalize(30)} />
                        <Text style={styles.lblInput}>Loja</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        selectionColor={theme.GlobalColorsApp.btnRed}
                        placeholder="Vila Campo Grande"
                    />
                    <Button
                        title="Iniciar Inspeção"
                        containerStyle={{ ...stylesGlobal.btnContainer, marginTop: normalize(25) }}
                        buttonStyle={styles.startInspection}
                        titleStyle={styles.fontCustom}
                        onPress={() => navigation.navigate(screen.home.tab, { screen: screen.home.home })}
                    />

                </View>
                <Footer />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

