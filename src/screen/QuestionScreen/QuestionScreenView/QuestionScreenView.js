import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  LogBox,
  Alert,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Icon } from "react-native-elements";
import {
  stylesGlobal,
  theme,
  storageResult,
  checkConnected,
} from "../../../utils";
import CustomerHeader from "../../../navigation/CustomerHeader";
import { Footer, HeaderPercentage, Loading } from "../../../components";
import { styles } from "./QuestionScreenView.style";
import {
  ButtonsQuestion,
  CheckboxCustom,
  Disagreed,
  MultimediaQuestion,
} from "../../../components/question";
import normalize from "react-native-normalize";
import { useTranslation } from "react-i18next";

export function QuestionScreen(props) {
  const { route } = props;
  const [dataQuestion, setDataQuestion] = useState(false);
  const [imageSelected, setImageSelected] = useState([]);
  const navigation = useNavigation();
  const [agreed, setAgreed] = useState(false);
  const [disagreed, setDisagreed] = useState(false);
  const [notApplicable, setNotApplicable] = useState(false);
  const [connectStatus, setConnectStatus] = useState(false);
  const language = useRef("");
  const { t, i18n } = useTranslation();

  const loaderLanguage = async () => {
    const DataLenguage = await storageResult.getDataFormat("@SessionLanguage");
    i18n.changeLanguage(DataLenguage);
  };
  useEffect(() => {
    loaderLanguage();
  }, []);

  useEffect(() => {
    getData();
    checkConnected().then((res) => {
      setConnectStatus(res);
    });
  }, [route.params.numberQuestion, route.params.id, route.params.idCheckList]);

  useEffect(() => {
    validateDataInit();
  }, [dataQuestion, setDataQuestion]);

  const getData = async () => {
    const DataLenguage = await storageResult.getDataFormat("@SessionLanguage");
    language.current = DataLenguage;

    const DatosStorage = await storageResult.getDataFormat("@Session");
    setAgreed(false);
    setDisagreed(false);
    setNotApplicable(false);
    setDataQuestion(
      DatosStorage["dataQuestions"]["questions_" + route.params.id]["data"][
        "orden_" + route.params.numberQuestion
      ]
    );
  };

  const validateDataInit = async () => {
    if (dataQuestion) {
      const DatosStorage = await storageResult.getDataFormat(
        "@SessionResponse"
      );
      var keyQuestion = `${route.params.idCheckList}|${route.params.id}|${dataQuestion.id}|checkboxSelected`;

      if (typeof DatosStorage !== undefined && DatosStorage !== null) {
        if (
          DatosStorage[keyQuestion] !== undefined &&
          DatosStorage[keyQuestion] == "1"
        ) {
          setAgreed(true);
        }
        if (
          DatosStorage[keyQuestion] !== undefined &&
          DatosStorage[keyQuestion] == "2"
        ) {
          setDisagreed(true);
        }
        if (
          DatosStorage[keyQuestion] !== undefined &&
          DatosStorage[keyQuestion] == "3"
        ) {
          setNotApplicable(true);
        }
      }
      const DatosStorageImages = await storageResult.getDataFormat(
        "@SessionResponseImages"
      );
      var keyQuestionImages = `${route.params.idCheckList}|${route.params.id}|${dataQuestion.id}`;
      if (DatosStorageImages) {
        var DataImages = new Array();
        Object.entries(DatosStorageImages).forEach(([key, value]) => {
          if (key.includes(keyQuestionImages) && value !== "deleted") {
            DataImages.push(value);
          }
        });
        setImageSelected(DataImages);
      }
    }
  };

  function UploadImage(props) {
    const { imageSelected, setImageSelected } = props;

    const imageSelect = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "denied") {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: t("QuestionScreen.alertWarning"),
          text2: t("QuestionScreen.alertGallery"),
        });
      } else {
        if (imageSelected.length >= 3) {
          return Toast.show({
            type: "info",
            position: "bottom",
            text1: t("QuestionScreen.alertWarning"),
            text2: t("QuestionScreen.alertImage"),
          });
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          //allowsEditing: true,
          base64: true,
          aspect: [4, 3],
        });

        if (result.cancelled) {
          Toast.show({
            type: "info",
            position: "bottom",
            text1: "Advertência",
            text2: t("QuestionScreen.alertImageClose"),
          });
        } else {
          let dataImage = result.uri?.split("/");
          let nameImage = dataImage[dataImage?.length - 1];
          storageResult.setItemValueImages(
            route.params.idCheckList,
            route.params.id,
            dataQuestion.id,
            nameImage,
            result.base64
          );
          setImageSelected([...imageSelected, `${result.base64}`]);
        }
      }
    };

    const removeImage = (image) => {
      Alert.alert(
        t("QuestionScreen.textDeleteImage"),
        t("QuestionScreen.textDeleteImageSure"),
        [
          {
            text: t("QuestionScreen.btnCancel"),
            style: "cancel",
          },
          {
            text: t("QuestionScreen.btnDelete"),
            onPress: async () => {
              const DatosStorageImages = await storageResult.getDataFormat(
                "@SessionResponseImages"
              );
              var keyQuestionImages = `${route.params.idCheckList}|${route.params.id}|${dataQuestion.id}`;

              if (DatosStorageImages) {
                var DataImages = new Array();
                Object.entries(DatosStorageImages).forEach(([key, value]) => {
                  if (key.includes(keyQuestionImages)) {
                    if (value === image) {
                      const dataKey = key?.split("|");
                      storageResult.setItemValueImages(
                        dataKey[0],
                        dataKey[1],
                        dataKey[2],
                        dataKey[3],
                        "deleted"
                      );
                    } else {
                      if (value !== "deleted") {
                        DataImages.push(value);
                      }
                    }
                  }
                });
                setImageSelected(DataImages);
              }
            },
          },
        ],
        { cancelable: false }
      );
    };

    return (
      <>
        <TouchableOpacity style={styles.viewImage} onPress={imageSelect}>
          <Icon
            type="material-community"
            name="camera"
            color="#000000"
            containerStyle={styles.containerIcon}
          />
          <Text style={styles.lblUploadImage}>
            {t("QuestionScreen.unploadImage")}
          </Text>
        </TouchableOpacity>

        <View style={styles.containerImagesUpload}>
          {imageSelected &&
            imageSelected.map((item, i) => {
              var base64Image = `data:image/png;base64, ${item}`;
              return (
                <View key={i}>
                  <Avatar
                    style={styles.miniaturaStyle}
                    source={{ uri: base64Image }}
                  />
                  <Icon
                    type="ionicon"
                    name="trash-outline"
                    color="red"
                    size={normalize(25)}
                    onPress={() => removeImage(item)}
                  />
                </View>
              );
            })}
        </View>
      </>
    );
  }

  if (!dataQuestion) {
    return <View />;
  }

  return (
    <SafeAreaView style={stylesGlobal.contentGlobal}>
      <CustomerHeader />
      {dataQuestion ? (
        <>
          <ScrollView>
            <HeaderPercentage
              idCheckList={route.params.idCheckList}
              idCategory={route.params.id}
              idQuestion={dataQuestion.id}
              numberQuestion={route.params.numberQuestion}
              screenQuestion={"1"}
              insideQuestion={"1"}
            />
            <View style={{ ...stylesGlobal.contentView }}>
              <Text style={styles.lblQuestion}>
                {language.current == "pt"
                  ? dataQuestion.titlePortuguese
                  : dataQuestion.titleSpanish}
              </Text>
              {connectStatus && (
                <MultimediaQuestion
                  multimedia={dataQuestion.multimedia}
                  typeMultimedia={dataQuestion.type_multimedia}
                />
              )}
              <View style={styles.container}>
                <CheckboxCustom
                  checkboxSelected={agreed}
                  setCheckboxSelected={setAgreed}
                  color={theme.GlobalColorsApp.colorOptionActive}
                  icon={"thumbs-up-outline"}
                  title={
                    language.current == "pt"
                      ? dataQuestion.answer_options[0].labelPortuguese
                      : dataQuestion.answer_options[0].labelSpanish
                  }
                  toDisabledOne={setDisagreed}
                  toDisabledTwo={setNotApplicable}
                  number={"1"}
                  idAnswer={dataQuestion.answer_options[0].IdSurveysMoviAnswer}
                  idCategory={route.params.id}
                  idQuestion={dataQuestion.id}
                  idCheckList={route.params.idCheckList}
                  numberQuestion={route.params.numberQuestion}
                  isAnswersImages={dataQuestion.is_answers_images}
                  imageAnswer={dataQuestion.answer_options[0].img}
                  idConfiguration={dataQuestion.IdSurveysMovilConfiguration}
                />

                <CheckboxCustom
                  checkboxSelected={disagreed}
                  setCheckboxSelected={setDisagreed}
                  color={theme.GlobalColorsApp.colorOptionActiveDisagreed}
                  icon={"thumbs-down-outline"}
                  title={
                    language.current == "pt"
                      ? dataQuestion.answer_options[1].labelPortuguese
                      : dataQuestion.answer_options[1].labelSpanish
                  }
                  toDisabledOne={setAgreed}
                  toDisabledTwo={setNotApplicable}
                  number={"2"}
                  idAnswer={dataQuestion.answer_options[1].IdSurveysMoviAnswer}
                  idCategory={route.params.id}
                  idQuestion={dataQuestion.id}
                  idCheckList={route.params.idCheckList}
                  numberQuestion={route.params.numberQuestion}
                  isAnswersImages={dataQuestion.is_answers_images}
                  imageAnswer={dataQuestion.answer_options[1].img}
                  idConfiguration={dataQuestion.IdSurveysMovilConfiguration}
                />
                <CheckboxCustom
                  checkboxSelected={notApplicable}
                  setCheckboxSelected={setNotApplicable}
                  color={theme.GlobalColorsApp.colorOptionInactive}
                  title={
                    language.current == "pt"
                      ? dataQuestion.answer_options[2].labelPortuguese
                      : dataQuestion.answer_options[2].labelSpanish
                  }
                  toDisabledOne={setAgreed}
                  toDisabledTwo={setDisagreed}
                  number={"3"}
                  idAnswer={dataQuestion.answer_options[2].IdSurveysMoviAnswer}
                  idCategory={route.params.id}
                  idQuestion={dataQuestion.id}
                  idCheckList={route.params.idCheckList}
                  numberQuestion={route.params.numberQuestion}
                  isAnswersImages={dataQuestion.is_answers_images}
                  imageAnswer={dataQuestion.answer_options[2].img}
                  idConfiguration={dataQuestion.IdSurveysMovilConfiguration}
                />
              </View>
            </View>

            {dataQuestion.allow_img == "1" && (
              <View>
                <UploadImage
                  imageSelected={imageSelected}
                  setImageSelected={setImageSelected}
                />
              </View>
            )}

            <View>
              {disagreed && (
                <Disagreed
                  idCategory={route.params.id}
                  idQuestion={dataQuestion.id}
                  idCheckList={route.params.idCheckList}
                />
              )}
            </View>

        <ButtonsQuestion
              idCategory={route.params.id}
              numberQuestion={route.params.numberQuestion}
              idQuestion={dataQuestion.id}
              idCheckList={route.params.idCheckList}
              selectLanguage={language.current}
            />
              
            <Footer />
          </ScrollView>
        </>
      ) : (
        <Loading show />
      )}
    </SafeAreaView>
  );
}
