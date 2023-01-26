import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import normalize from 'react-native-normalize';
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from 'react-native-elements';
import { theme, storageResult } from '../../utils';
import { managerScreen } from '../../utils/managerScreen';
import { styles } from './ItemHome.style';



export function ItemHome(props) {

    const navigation = useNavigation();
    const { id, title, num_questions, color = '#666666', backgroundColor = '#3333330D', module, idCheckList = '', dataChecNoSent = [3, 5] } = props;

    const [completedData, setCompletedData] = useState(false);
    const [disagreedData, setDisagreedData] = useState(0);
    const [disagreedLabel, setDisagreedLabel] = useState('');
    const iconData = useRef('list-thumbnails');
    const colorData = useRef(color);
    const colorBorderData = useRef('#B3B3B3');
    const colorBorderDataNoSend = useRef('#B3B3B3');
    const colorTitleData = useRef(theme.GlobalColorsApp.btnGray);
    const backgroundData = useRef(backgroundColor);
    var statusCategory = false;
    if (Object.entries(dataChecNoSent).length !== 0 && dataChecNoSent?.includes(id)) {
        statusCategory = false;
    }
    else {
        statusCategory = true;
    }

    if (module == 'category') {
        useFocusEffect(
            useCallback(() => {
                completedByCategory(id);
            }, [completedData])
        );
    }
    const completedByCategory = async (idCategory) => {

        const StorageResponse = await storageResult.getDataFormat('@SessionResponse');
        const DataLenguage = await storageResult.getDataFormat("@SessionLanguage");
        let all_response = 0;
        let all_disagreed = 0
        if (typeof StorageResponse !== undefined && StorageResponse) {
            Object.entries(StorageResponse).forEach(([key, value]) => {
                if (key?.split('|')[1].includes(idCategory) && key.includes('checkboxSelected')) {
                    all_response = all_response + 1;
                }
                if (key?.split('|')[1].includes(idCategory) && key.includes('checkboxSelected') && value == 2) {
                    all_disagreed = all_disagreed + 1;
                }
            });
        }


        if (parseInt(all_response) == parseInt(num_questions)) {
            const resultData = (DataLenguage == 'pt') ? 'não-conformidad' : 'no-conforme';
            iconData.current = 'checkbox';
            colorData.current = '#84D9B1';
            backgroundData.current = '#D9F2E6';
            colorTitleData.current = '#5A8C70';
            colorBorderData.current = '#4F8265';
            colorBorderDataNoSend.current = '#E9E9E9';
            setDisagreedData(all_disagreed);
            setCompletedData(true);
            setDisagreedLabel(resultData);
        }
    }

    return (
   

            <TouchableOpacity
                style={{ ...styles.item, borderColor: colorBorderData.current }}
                onPress={() => managerScreen(navigation, id, module, idCheckList, statusCategory)}
                key={id}
            >
                <View style={{ ...styles.containerIcon, backgroundColor: backgroundData.current }}>
                    <Icon type="foundation" name={iconData.current} style={styles.iconMain} color={colorData.current} size={normalize(30)} />
                </View>
                <View style={styles.containerLabels}>
                    <Text style={{ ...styles.lblCategoryName, color: colorTitleData.current }}>
                        {title} {statusCategory}
                    </Text>
                    <Text style={styles.lblNumQuestions}>
                        {num_questions}  {disagreedData != 0 && (<Text style={{ color: '#F27629' }}>{` ${disagreedData}`}<Text style={{ color: theme.GlobalColorsApp.colorOptionInactive }}> {disagreedLabel}</Text></Text>)}
                    </Text>
                </View>
                <View style={styles.containerArrow}>

                    <Icon type="ionicon" name={statusCategory ? "arrow-forward-circle-outline":"timer-outline"} color="red" size={normalize(30)} />


                </View>
            </TouchableOpacity>
        )
    


}