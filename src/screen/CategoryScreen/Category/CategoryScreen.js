import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, FlatList, ScrollView, LogBox, Alert } from 'react-native';
import normalize from 'react-native-normalize';
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Footer, HeaderPercentage, Loading, Modal } from '../../../components';
import { ItemHome } from '../../../components/home';
import CustomerHeader from '../../../navigation/CustomerHeader';
import { styles } from './CategoryScreen.style';
import { screen, stylesGlobal, storageResult, theme, apis } from '../../../utils';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { useTranslation } from "react-i18next";


export function CategoryScreen(props) {

  const { route } = props;
  const navigation = useNavigation();
  const [dataCategoriesCheckList, setDataCategoriesCheckList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [completedChecklist, setCompletedChecklist] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [language, setLanguage] = useState('');
  const [test, setTest] = useState('');
  const { t, i18n } = useTranslation();


    const loaderLanguage = async () => {
        const DataLenguage = await storageResult.getDataFormat('@SessionLanguage');
        i18n.changeLanguage(DataLenguage);
        console.log(DataLenguage);
    
      }

      
      useEffect(() => {
     
        loaderLanguage();
        
    
      }, []);

  useEffect(() => {
    getData();
    containerDataModal();
  }, [])

  useFocusEffect(
    useCallback(() => {
      completedByCheckList();
    }, [])
  );


  const getData = async () => {
    const DataLenguage = await storageResult.getDataFormat('@SessionLanguage');
    setLanguage(DataLenguage);
    const DatosStorage = await storageResult.getDataFormat('@Session');
    if (typeof DatosStorage !== undefined && DatosStorage['dataCategories']['categories_' + route.params.id]) {
      setDataCategoriesCheckList(DatosStorage['dataCategories']['categories_' + route.params.id]['data']);
    }
  }

  const containerDataModal = async () => {
    setRenderComponent(
      <View style={styles.containerModal}>
        <Text style={styles.textModal}>Por favor, confirme que deseja enviar a inspeção.</Text>
        <Button
          title="Enviar"
          containerStyle={stylesGlobal.btnContainer}
          titleStyle={styles.fontCustom}
          buttonStyle={{ backgroundColor: '#5A8C70', borderRadius: 10, height: normalize(40, 'height') }}
          onPress={() => finishInspectionAction()}
        />
      </View>
    );
  };


  const completedByCheckList = async () => {

    const idChecklist = route.params.idCheckList;

    const StorageResponse = await storageResult.getDataFormat('@SessionResponse');
    let all_response = 0;
    if (typeof StorageResponse !== undefined && StorageResponse) {
      Object.entries(StorageResponse).forEach(([key, value]) => {
        if (key?.split('|')[0].includes(idChecklist) && key.includes('checkboxSelected')) {
          all_response = all_response + 1;
        }
      });
    }

    const DatosStorage = await storageResult.getDataFormat('@Session');
    const ArrayCheckList = DatosStorage['checkList']['data'];
    let numberQuestionsByCheckList = 0;

    if (DatosStorage !== undefined && ArrayCheckList) {
      let claves = Object.keys(ArrayCheckList);
      for (let i = 0; i < claves.length; i++) {
        if (ArrayCheckList[i]['idCheckList'] == idChecklist) {
          numberQuestionsByCheckList = ArrayCheckList[i]['numberQuestion'];
        }
      }
      if (parseInt(all_response) == parseInt(numberQuestionsByCheckList)) {
        setCompletedChecklist(true);
      }
    }

  }

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);



  const finishInspection = () => {
    setShowModal((prevState) => !prevState);
  }

  const finishInspectionAction = async () => {

    const StorageResponse = await storageResult.getDataFormat('@SessionResponse');
    const StorageResponseImages = await storageResult.getDataFormat('@SessionResponseImages');
    let objDataSend = {};
    let objDataSendCategory = {};
    let idQuestions = new Array();

    if (typeof StorageResponse !== undefined && StorageResponse) {
      //json base
      const DataLenguage = await storageResult.getDataFormat('@SessionLanguage');
      const DatauserId = await storageResult.getDataFormat('@userId');
      const dataSendJSON = {
        'CreatedBy': DatauserId,
        'IdIncidentsStore': '53',
        'IdIndicatorsCountry': '2',
        'IdIndicatorsLanguages': DataLenguage,
        'IdState': '1',
        'SurveysMovilDetailsClassificationQuestions': [],
        'SurveysMovilDetailsQuestions': [],
        'SurveysMovilDetailsQuestionsPhotos': []
      };

      // creacion de la data de SurveysMovilDetailsQuestions

      Object.entries(StorageResponse).forEach(([key, value]) => {
        const keyObj = key?.split('|');
        // entra solo una vez por id para armar la estructura
        if (!idQuestions.includes(keyObj[2])) {
          if (keyObj[2] != '0') {
            objDataSend[keyObj[2]] = {
              'IdIncidentsRisk': '',
              'IdIncidentsRiskSeverity': '',
              'IdIncidentsSector': '',
              'IdSurveysMovil': keyObj[1],
              'IdSurveysMovilDetails': '', // se envia vacio
              'IdSurveysMovilQuestions': keyObj[2],
              'IdSurveysMovilResponses': value,
              'IsRiskAnalysis': '0',
              'Observations': '',
              'ObservationsProposed': '',
            };
          } else {
            objDataSendCategory[keyObj[1]] = {
              'ObservationsClassificationQuestions': value,
            };
          }

        } else {
          if (keyObj[3] == 'IsRiskAnalysis') {
            const valueConvert = (value === true) ? "1" : "0";
            objDataSend[keyObj[2]][keyObj[3]] = valueConvert;
          } else {
            objDataSend[keyObj[2]][keyObj[3]] = value;
          }

        }

        if (keyObj[2] != '0') idQuestions.push(keyObj[2]);
      });

      // uno la data de SurveysMovilDetailsQuestions al objeto
      var data_formate_answer = [];
      Object.entries(objDataSend).forEach(([key, value]) => {
        delete value.idConfiguration;
        data_formate_answer.push(value);
      });

      dataSendJSON.SurveysMovilDetailsQuestions = data_formate_answer;

      // uno la data de SurveysMovilDetailsQuestionsPhotos al objeto
      var data_formate_image = [];
      if (typeof StorageResponseImages !== undefined && StorageResponseImages) {

        Object.entries(StorageResponseImages).forEach(([keyImg, valueImg]) => {
          const keyObjImg = keyImg?.split('|');
          data_formate_image.push({
            'FileBinary': 'valueImg', // valueImg
            'FileName': keyObjImg[3],
            'FileType': 'image/' + '' + keyObjImg[3]?.split('.')[keyObjImg[3]?.split('.').length - 1],
          });
        });

      }

      dataSendJSON.SurveysMovilDetailsQuestionsPhotos = data_formate_image;

      // uno la data de SurveysMovilDetailsClassificationQuestions al objeto
      var data_formate_comment_category = [];
      if (typeof objDataSendCategory !== undefined && objDataSendCategory) {
        Object.entries(objDataSendCategory).forEach(([keyComments, valueComents]) => {
          data_formate_comment_category.push({
            "idSurveysMovilClassificationQuestions": keyComments,
            "observations": valueComents.ObservationsClassificationQuestions
          });
        });
      }

      dataSendJSON.SurveysMovilDetailsClassificationQuestions = data_formate_comment_category;


      console.log(dataSendJSON);
      setTest(dataSendJSON);
      return;

      axios.post(apis.GlobalApis.url_save, {
        dataSendJSON
      })
        .then(function (res) {
          if (res.status == 200) {
            console.log('estatus 200 ', res.data);
          }
          console.log('entro aqui ', res);
        })
        .catch(function (err) {
          console.log('Error de conexión ' + err);
        })
        .then(function () {

        });

      // console.log(JSON.stringify(DataSessionSend, null, 3));

      if (1 !== 1) {
        // le dio guardar y no tenia internet 

      }

    }

    // console.log(JSON.stringify(objDataSend, null, 3));
    return;

    setShowModal((prevState) => !prevState);
    navigation.navigate(screen.inspectionCompleted.tab, { screen: screen.inspectionCompleted.inspectionCompleted })

  }

  const RenderItem = ({ item, language }) => {
    const labelQuestion = (language == 'pt') ? 'perguntas' : 'preguntas';
    return (<ItemHome
      id={item.Id}
      title={language == 'es' ? item.NameSpanish : item.NamePortuguese}
      num_questions={`${item.numberQuestion}  ${labelQuestion}`}
      module='category'
      idCheckList={route.params.idCheckList}
      setCompletedChecklist={setCompletedChecklist}
    />);
  };

  return (
    <SafeAreaView style={stylesGlobal.contentGlobal}>
      <CustomerHeader />
      {
        dataCategoriesCheckList ?
          (
            <>
              <ScrollView>
                <HeaderPercentage
                  idCheckList={route.params.idCheckList}
                />
                <View style={{ ...stylesGlobal.contentView, ...styles.container, }}>
                  <Text>{JSON.stringify(test, null, 3)}</Text>
                  <FlatList
                    ListHeaderComponent={<Text style={styles.titleCategory}>{t("Category.title")}</Text>}
                    data={dataCategoriesCheckList}
                    contentContainerStyle={{ paddingVertical: normalize(30, 'height') }}
                    renderItem={({ item }) => <RenderItem item={item} language={language} />}
                    keyExtractor={item => item.Id}
                    ListFooterComponent={
                      <Button
                        disabled={completedChecklist ? false : true}
                        title={t("Category.btnEnd")}
                        titleStyle={styles.fontCustom}
                        containerStyle={stylesGlobal.btnContainer}
                        buttonStyle={{ ...stylesGlobal.btn, alignSelf: 'center', width: '80%', backgroundColor: completedChecklist ? '#84D9B1' : '#F2F2F2' }}
                        onPress={() => finishInspection()}
                      />
                    }
                  />
                </View>

                <Footer />
              </ScrollView>
            </>
          ) :
          (
            <Loading show />
          )
      }

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>

    </SafeAreaView>
  )
}