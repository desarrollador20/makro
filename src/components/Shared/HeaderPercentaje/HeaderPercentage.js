import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from "@react-navigation/native";
import normalize from 'react-native-normalize';
import { ProgressBar } from 'react-native-paper';
import { theme, storageResult } from '../../../utils';
import { styles } from './HeaderPercentage.style';

export function HeaderPercentage(props) {

  const { idCheckList, idCategory = 0, idQuestion, numberQuestion, screenQuestion = '0', insideQuestion = '0' } = props;
  const [dataCheckList, setDataCheckList] = useState(false);
  const [percentage, setPercentage] = useState(false);
  const language = useRef('');
  const numberQuestionForCategory = useRef('');
  const nameCategoryP = useRef('');
  const nameCategoryE = useRef('');

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const DataLenguage = await storageResult.getDataFormat('@SessionLanguage');
    language.current = DataLenguage;
    const DatosStorage = await storageResult.getDataFormat('@Session');
    if (typeof DatosStorage !== undefined && DatosStorage['checkList']['data']) {
      const data = DatosStorage['checkList']['data'];
      Object.entries(data).forEach(([key, value]) => {
        if (value.idCheckList == idCheckList) {
          setDataCheckList(value);
          return;
        }
      });
    }
  }

  if (screenQuestion == '0') {
    useFocusEffect(
      useCallback(() => {
        getDataField();
      }, [])
    );
  } else {
    useEffect(() => {
      getDataField();
    }, [numberQuestion])
  }




  const getDataField = async () => {
    const DatosStorage = await storageResult.getDataFormat('@Session');

    if (typeof DatosStorage !== undefined && DatosStorage['dataCategories']['categories_' + idCheckList]) {
      const dataCategory = DatosStorage['dataCategories']['categories_' + idCheckList]['data'];
      Object.entries(dataCategory).forEach(([key, value]) => {
        if (value.Id == idCategory) {
          numberQuestionForCategory.current = value.numberQuestion;
          nameCategoryP.current = value.NamePortuguese;
          nameCategoryE.current = value.NameSpanish;
        }
      });
    }

    const StorageResponse = await storageResult.getDataFormat('@SessionResponse');
    if (typeof StorageResponse !== undefined && StorageResponse) {
      let all_response = 0;
      Object.entries(StorageResponse).forEach(([key, value]) => {
        if (insideQuestion == '1') {
          if (key?.split('|')[0].includes(idCheckList) && key?.split('|')[1].includes(idCategory) && key.includes('checkboxSelected')) {
            all_response = all_response + 1;
          }
        } else {
          if (key?.split('|')[0].includes(idCheckList) && key.includes('checkboxSelected')) {
            all_response = all_response + 1;
          }
        }

      });
      setPercentage(all_response);
    }
  }


  if (!dataCheckList) {
    return <View />
  }

  const numberQuestionView = (insideQuestion == '1') ? numberQuestionForCategory.current : dataCheckList.numberQuestion;

  return (
    <View style={{ ...styles.container, backgroundColor: '#FCF8F6' }} >
      <View
        style={{ ...styles.containerIcon, backgroundColor: dataCheckList.backgroundColor }} >
        <Icon type="foundation" name="list-thumbnails" style={styles.iconMain} color={dataCheckList.color} size={normalize(30)} />
      </View>
      <View style={styles.containerLabels}>
        <Text style={{ ...styles.lblCategoryName, color: dataCheckList.color }}>
          {dataCheckList.nameCheckList}
        </Text>
        {
          (insideQuestion == '1') ? (
            <>
              <Text style={styles.lblNumQuestions}>
                {(language.current == 'pt') ? nameCategoryP.current : nameCategoryE.current}
              </Text>
            </>
          )
            :
            (
              <>
                <Text style={styles.lblNumQuestions}>
                  {percentage == '' ? 0 : percentage} {(language.current == 'pt') ? 'do' : 'de'} {numberQuestionView} {(language.current == 'pt') ? 'perguntas' : 'preguntas'}
                </Text>
              </>
            )
        }

        <ProgressBar progress={(percentage * 1) / numberQuestionView} color={dataCheckList.color} style={styles.progressBar} />
        <Text style={styles.lblNumQuestions}>
          {((percentage * 100) / numberQuestionView).toFixed(0)}%
        </Text>
      </View>
    </View>
  )
}