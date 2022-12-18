import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useClickButtom } from '../../../hooks/useClickButtom';
import { stylesGlobal, theme, screen, storageResult, checkConnected } from '../../../utils';
import { styles } from './ButtonsQuestion.style';

export function ButtonsQuestion(props) {

    const [language, setLanguage] = useState(false);
    const { idCategory, numberQuestion, idQuestion, screenPositiveComments = 0, screenResponsileList = 0, idCheckList } = props;
    const { validarFields } = useClickButtom();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const DataLenguage = await storageResult.getDataFormat('@SessionLanguage');
        setLanguage(DataLenguage);
    }

    if (!language) {
        return (<View />);
    }

    return (
        <View style={{ ...stylesGlobal.contentView, alignItems: 'center' }}>
            <View style={stylesGlobal.containerButton}>
                <Button
                    title={language == 'pt' ? 'prévio' : 'previo'}
                    containerStyle={stylesGlobal.btnContainer}
                    buttonStyle={{ ...stylesGlobal.btn, backgroundColor: theme.GlobalColorsApp.btnGrayPrev }}
                    onPress={() => validarFields(idCategory, numberQuestion, idQuestion, screenPositiveComments, screenResponsileList, idCheckList, 'prev')}
                />

                <Button
                    title={screenResponsileList == 1 ? language == 'pt' ? 'fim' : 'fin' : "próximo"}
                    containerStyle={stylesGlobal.btnContainer}
                    titleStyle={styles.fontCustom}
                    buttonStyle={{ ...stylesGlobal.btn, backgroundColor: theme.GlobalColorsApp.btnGrayNext }}
                    onPress={() => validarFields(idCategory, numberQuestion, idQuestion, screenPositiveComments, screenResponsileList, idCheckList, 'next')}
                />
            </View>
        </View>
    )
}