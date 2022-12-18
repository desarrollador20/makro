import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import normalize from 'react-native-normalize';
import RNPickerSelect from 'react-native-picker-select';
import { Footer, HeaderPercentage } from '../../components';
import { ButtonsQuestion } from '../../components/question';
import CustomerHeader from '../../navigation/CustomerHeader';
import { stylesGlobal, theme } from '../../utils';
import { styles } from './ResponsibleList.style';

export function ResponsibleList(props) {
    const { route } = props;

    const pickerStyle = {
        inputIOS: {
            fontFamily: 'kodchasan-extraLight',
            color: theme.GlobalColorsApp.btnGray,
            height: normalize(40, 'height'),
            padding: normalize(10)
        },
        placeholder: {
            color: theme.GlobalColorsApp.btnGray,
        },
        inputAndroid: {
            fontFamily: 'kodchasan-extraLight',
            color: theme.GlobalColorsApp.btnGray,
            height: normalize(50, 'height'),
            paddingLeft: normalize(10)
        },
    };

    const selectedLMAction = (value, idCategory) => {

    }

    const ItemResponsible = (props) => {
        const { name } = props;
        return (
            <View style={styles.containerList}>
                <Text style={styles.nameList}>{name}</Text>
                <Icon style={styles.iconList} type="ionicon" color={theme.GlobalColorsApp.btnRed} size={normalize(25)} name="trash-outline" iconStyle={{}} />
            </View>
        )
    }

    return (
        <SafeAreaView style={stylesGlobal.contentGlobal}>
            <CustomerHeader />
            <ScrollView>
                <HeaderPercentage
                    idCheckList={route.params.idCheckList}
                    idCategory={route.params.id}
                    numberQuestion={route.params.numberQuestion + 1}
                    insideQuestion={'1'}
                />
                <View style={styles.container}>
                    <View style={styles.containerHeader}>
                        <Text style={styles.lblTitle}>O sistema identificou não-conformidades nesta categoria, favor confirmar abaixo a
                            pessoa responsável a quem elas devem ser enviadas:</Text>
                        <View style={styles.emulateStyleCombo}>
                            <RNPickerSelect
                                name='gravity'
                                onValueChange={(value) => { }}
                                useNativeAndroidPickerStyle={false}
                                placeholder={{
                                    label: 'Nome Responsável',
                                    value: null,
                                }}
                                dropdownIconColor='red'
                                style={pickerStyle}
                                items={[
                                    { label: 'Hipólito Patiño Beltrán', value: '110238455' },
                                    { label: 'Camilo Cortez', value: '34455' },
                                    { label: 'Maria Helena Martinez', value: '33455' },
                                ]}
                            />
                        </View>
                    </View>
                    <ItemResponsible name='Hipólito Patiño Beltrán' />

                </View>

                <ButtonsQuestion
                    idCategory={route.params.id}
                    numberQuestion={route.params.numberQuestion + 1}
                    screenResponsileList={1}
                    idCheckList={route.params.idCheckList}
                />
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}