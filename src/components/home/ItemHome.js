import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import normalize from 'react-native-normalize';
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from 'react-native-elements';
import { theme, storageResult } from '../../utils';
import { managerScreen } from '../../utils/managerScreen';
import { styles } from './ItemHome.style';



export function ItemHome(props) {

    const navigation = useNavigation();
    const { id, title, num_questions, color = '#666666', backgroundColor = '#3333330D', module, idCheckList = '' } = props;

    const [completedData, setCompletedData] = useState(false);
    const [disagreedData, setDisagreedData] = useState(0);
    const [disagreedLabel, setDisagreedLabel] = useState('');
    const iconData = useRef('list-thumbnails');
    const colorData = useRef(color);
    const colorBorderData = useRef('#B3B3B3');
    const colorTitleData = useRef(theme.GlobalColorsApp.btnGray);
    const backgroundData = useRef(backgroundColor);


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
            setDisagreedData(all_disagreed);
            setCompletedData(true);
            setDisagreedLabel(resultData);
        }
    }

    return (
        <TouchableOpacity
            style={{ ...styles.item, borderColor: colorBorderData.current }}
            onPress={() => managerScreen(navigation, id, module, idCheckList)}
            key={id}
        >
            <View style={{ ...styles.containerIcon, backgroundColor: backgroundData.current }}>
                <Icon type="foundation" name={iconData.current} style={styles.iconMain} color={colorData.current} size={normalize(30)} />
            </View>
            <View style={styles.containerLabels}>
                <Text style={{ ...styles.lblCategoryName, color: colorTitleData.current }}>
                    {title}
                </Text>
                <Text style={styles.lblNumQuestions}>
                    {num_questions}  {disagreedData != 0 && (<Text style={{ color: '#F27629' }}>{` ${disagreedData}`}<Text style={{ color: theme.GlobalColorsApp.colorOptionInactive }}> {disagreedLabel}</Text></Text>)}
                </Text>
            </View>
            <View style={styles.containerArrow}>
                <Icon type="ionicon" name="arrow-forward-circle-outline" color={colorData.current} size={normalize(30)} />
            </View>
        </TouchableOpacity>
    )
}