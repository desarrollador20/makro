import React, { useState, useEffect, useCallback } from "react";
import { View, Text, SafeAreaView, FlatList, ScrollView, Alert } from "react-native";
import normalize from "react-native-normalize";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Footer, HeaderPercentage, Loading, Modal } from "../../../components";
import { ItemHome } from "../../../components/home";
import CustomerHeader from "../../../navigation/CustomerHeader";
import { styles } from "./CategoryScreen.style";
import { screen, stylesGlobal, storageResult, apis, lng } from "../../../utils";
import { Button } from "react-native-elements";

export function CategoryScreen(props) {
  const { route } = props;
  const navigation = useNavigation();
  const [dataCategoriesCheckList, setDataCategoriesCheckList] = useState(false);
  const [downloadingData, setDownloadingData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [completedChecklist, setCompletedChecklist] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const { t } = lng.useTranslation();

  useEffect(() => {
    getData();
    containerDataModal();
  }, []);

  useFocusEffect(
    useCallback(() => {
      completedByCheckList();
    }, [])
  );

  const getData = async () => {
    const DatosStorage = await storageResult.getDataFormat("@Session");
    if (typeof DatosStorage !== undefined && DatosStorage["dataCategories"]["categories_" + route.params.id]) {
      setDataCategoriesCheckList(DatosStorage["dataCategories"]["categories_" + route.params.id]["data"]);
    }
  };

  const containerDataModal = async () => {
    setRenderComponent(
      <View style={styles.containerModal}>
        <Text style={styles.textModal}>{t("Category.textModal")}</Text>
        <Button
          title={t("Category.btnModal")}
          containerStyle={stylesGlobal.btnContainer}
          titleStyle={styles.fontCustom}
          buttonStyle={{
            backgroundColor: "#5A8C70",
            borderRadius: 10,
            height: normalize(40, "height"),
          }}
          onPress={() => finishInspectionAction()}
        />
      </View>
    );
  };

  const completedByCheckList = async () => {
    const idChecklist = route.params.idCheckList;

    const StorageResponse = await storageResult.getDataFormat(
      "@SessionResponse"
    );
    let all_response = 0;
    if (typeof StorageResponse !== undefined && StorageResponse) {
      Object.entries(StorageResponse).forEach(([key, value]) => {
        if (
          key?.split("|")[0].includes(idChecklist) &&
          key.includes("checkboxSelected")
        ) {
          all_response = all_response + 1;
        }
      });
    }

    const DatosStorage = await storageResult.getDataFormat("@Session");
    const ArrayCheckList = DatosStorage["checkList"]["data"];
    let numberQuestionsByCheckList = 0;

    if (DatosStorage !== undefined && ArrayCheckList) {
      let claves = Object.keys(ArrayCheckList);
      for (let i = 0; i < claves.length; i++) {
        if (ArrayCheckList[i]["idCheckList"] == idChecklist) {
          numberQuestionsByCheckList = ArrayCheckList[i]["numberQuestion"];
        }
      }
      if (parseInt(all_response) == parseInt(numberQuestionsByCheckList)) {
        setCompletedChecklist(true);
      }
    }
  };

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const finishInspection = () => {
    setShowModal((prevState) => !prevState);
  };

  const finishInspectionAction = async () => {
    setShowModal(false);
    setDownloadingData(true);

   
    const StorageResponse = await storageResult.getDataFormat("@SessionResponse");
    const StorageResponseImages = await storageResult.getDataFormat("@SessionResponseImages");
    const StorageResponseListResponsible = await storageResult.getDataFormat("@SessionResponsibleList");
    let objDataSend = {};
    let objDataSendCategory = {};
    let idQuestions = new Array();

    if (typeof StorageResponse !== undefined && StorageResponse) {
      //json base
      const DatauserId = await storageResult.getDataFormat("@userId");
      const storageIdCountry = await storageResult.getDataFormat("@SessionIdCountry");
      const storageIdStore = await storageResult.getDataFormat("@SessionIdStore");

      const dataSendJSON = {
        CreatedBy: DatauserId,
        IdIncidentsStore: storageIdStore,
        IdIndicatorsCountry: storageIdCountry,
        IdIndicatorsLanguages: t("Global.flag") == 'pt' ? '2' : '1',
        IdState: "1",
        SurveysMovilDetailsClassificationUsers: [],
        SurveysMovilDetailsClassificationQuestions: [],
        SurveysMovilDetailsQuestions: []
      };

      // creacion de la data de SurveysMovilDetailsQuestions

      Object.entries(StorageResponse).forEach(([key, value]) => {
        const keyObj = key?.split("|");
        // entra solo una vez por id para armar la estructura
        if (!idQuestions.includes(keyObj[2])) {
          if (keyObj[2] != "0") {
            objDataSend[keyObj[2]] = {
              IdIncidentsRisk: "",
              IdIncidentsRiskSeverity: "",
              IdIncidentsSector: "",
              IdSurveysMovil: keyObj[0],
              IdSurveysMovilDetails: "", // se envia vacio
              IdSurveysMovilQuestions: keyObj[2], // duda 
              IdSurveysMovilResponses: value,
              IsRiskAnalysis: "0",
              Observations: "",
              ObservationsProposed: "",
              SurveysMovilDetailsQuestionsPhotos: [{
                FileBinary: "",
                FileName: "",
                FileType: "",
              }]
            };
          } else {
            objDataSendCategory[keyObj[1]] = {
              ObservationsClassificationQuestions: value,
            };
          }
        } else {
          if (keyObj[3] == "IsRiskAnalysis") {
            const valueConvert = value === true ? "1" : "0";
            objDataSend[keyObj[2]][keyObj[3]] = valueConvert;
          } else {
            objDataSend[keyObj[2]][keyObj[3]] = value;
          }
        }

        if (keyObj[2] != "0") idQuestions.push(keyObj[2]);
      });

      // uno la data de SurveysMovilDetailsQuestionsPhotos al objeto
      var data_formate_image = [];
      Object.entries(objDataSend).forEach(([key, value]) => {
        if (typeof StorageResponseImages !== undefined && StorageResponseImages && Object.entries(StorageResponseImages).length !== 0) {
          Object.entries(StorageResponseImages).forEach(([keyImg, valueImg]) => {
            const keyObjImg = keyImg?.split("|");
            if (keyObjImg[2] == value.IdSurveysMovilQuestions) {
              console.log("imagen: "+ keyObjImg[3]);
              data_formate_image.push({
                FileBinary: valueImg, // valueImg
                FileName: keyObjImg[3],
                FileType: "image/" + "" + keyObjImg[3]?.split(".")[keyObjImg[3]?.split(".").length - 1],
              });
              value.SurveysMovilDetailsQuestionsPhotos = data_formate_image;
            }
          });
        }
      });

      // uno la data de SurveysMovilDetailsQuestions al objeto
      var data_formate_answer = [];
      Object.entries(objDataSend).forEach(([key, value]) => {
        delete value.idConfiguration;
        data_formate_answer.push(value);
      });

      dataSendJSON.SurveysMovilDetailsQuestions = data_formate_answer;

      // uno la data de SurveysMovilDetailsClassificationQuestions al objeto
      var data_formate_comment_category = [];
      if (typeof objDataSendCategory !== undefined && objDataSendCategory && Object.entries(objDataSendCategory).length !== 0) {
        Object.entries(objDataSendCategory).forEach(([keyComments, valueComents]) => {
          data_formate_comment_category.push({
            idSurveysMovilClassificationQuestions: keyComments,
            observations: valueComents.ObservationsClassificationQuestions,
          });
        }
        );
      } else {
        data_formate_comment_category.push({
          'idSurveysMovilClassificationQuestions': '',
          'observations': '',
        });
      }

      dataSendJSON.SurveysMovilDetailsClassificationQuestions = data_formate_comment_category;

      // uno la data de SurveysMovilDetailsClassificationUsers al objeto
      var data_clasification_user = [];
      if (typeof StorageResponseListResponsible !== undefined && StorageResponseListResponsible && Object.entries(StorageResponseListResponsible).length !== 0) {
        Object.entries(StorageResponseListResponsible).forEach(([key, value]) => {
          data_clasification_user.push({
            'IdSurveysMovilDetails': value.idCheckList.toString(),
            'IdSurveysMovilClassificationQuestions': value.idCategory,
            'IdUsers': value.value
          });
        }
        );
      } else {
        data_clasification_user.push({
          'IdSurveysMovilDetails': '',
          'IdSurveysMovilClassificationQuestions': '',
          'IdUsers': ''
        });
      }

      dataSendJSON.SurveysMovilDetailsClassificationUsers = data_clasification_user;

      async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

      postData(apis.GlobalApis.url_save, dataSendJSON)
        .then(async (data) => {
          setDownloadingData(false);

          if (data === true) {
            console.log(data); // JSON data parsed by `data.json()` call
            await storageResult.removeItemValue("@SessionResponse");
            await storageResult.removeItemValue("@SessionResponseImages");
            await storageResult.removeItemValue("@SessionResponsibleList");
            await storageResult.removeItemValue("@IdCheklistNotProcessed");
            //await storageResult.removeItemValue("@SessionIdStore");
            //await storageResult.removeItemValue("@SessionIdCountry");
            //await storageResult.removeItemValue("@Session");
            setShowModal((prevState) => !prevState);
            navigation.navigate(screen.inspectionCompleted.tab, {
              screen: screen.inspectionCompleted.inspectionCompleted,
            });
          } else {
            checkedWon(route.params.idCheckList);
          }
        }).catch(function (err) {
          console.log("Error de conexión " + err);
          setDownloadingData(false);

        });
    }
  };

  const checkedWon = async (idChecklist) => {
    // await storageResult.removeItemValue("@IdCheklistNotProcessed");
    const DatosOffline = await storageResult.getDataFormat('@IdCheklistNotProcessed');
    if (DatosOffline && DatosOffline !== null) {
      const withoutDuplicate = [...DatosOffline, idChecklist];
      const unicos = withoutDuplicate.filter((valor, indice) => {
        return withoutDuplicate.indexOf(valor) === indice;
      }
      );
      await storageResult.setIdCheklistSentNotProcessed(unicos);
    } else {
      await storageResult.setIdCheklistSentNotProcessed([idChecklist]);
    }
  

    Alert.alert(
      "Alerta",
      t("Category.textNoSend"),
      [
        {
          text: t("Global.flag") == "pt" ? "Está bem." : "Está bien.",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },

      ]
    );


  }

  const RenderItem = ({ item, language }) => {
    const labelQuestion = language == "pt" ? "perguntas" : "preguntas";
    return (
      <ItemHome
        id={item.Id}
        title={language == "es" ? item.NameSpanish : item.NamePortuguese}
        num_questions={`${item.numberQuestion}  ${labelQuestion}`}
        module="category"
        idCheckList={route.params.idCheckList}
        setCompletedChecklist={setCompletedChecklist}
      />
    );
  };

  if (!dataCategoriesCheckList) {
    return (<Loading show />);
  }

  return (
    <SafeAreaView style={stylesGlobal.contentGlobal}>
      <CustomerHeader t={t} />
      <ScrollView>
        <HeaderPercentage idCheckList={route.params.idCheckList} />
        <View style={{ ...stylesGlobal.contentView, ...styles.container }}>
          <FlatList
            ListHeaderComponent={
              <Text style={styles.titleCategory}>
                {t("Category.title")}
              </Text>
            }
            data={dataCategoriesCheckList}
            contentContainerStyle={{
              paddingVertical: normalize(30, "height"),
            }}
            renderItem={({ item }) => (
              <RenderItem item={item} language={t("Global.flag")} />
            )}
            keyExtractor={(item) => item.Id}
            ListFooterComponent={
              <Button
                disabled={completedChecklist ? false : true}
                loading={downloadingData}
                title={t("Category.btnEnd")}
                titleStyle={styles.fontCustom}
                containerStyle={stylesGlobal.btnContainer}
                buttonStyle={{
                  ...stylesGlobal.btn,
                  alignSelf: "center",
                  width: "80%",
                  backgroundColor: completedChecklist
                    ? "#84D9B1"
                    : "#F2F2F2",
                }}
                onPress={() => finishInspection()}
                
              />
            }
          />
        </View>

        <Footer />
      </ScrollView>

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </SafeAreaView>
  );
}
