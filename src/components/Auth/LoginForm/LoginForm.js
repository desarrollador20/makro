import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Input, Icon, Button, Text } from "react-native-elements";
import Toast from "react-native-toast-message";
import axios from "axios";
import normalize from "react-native-normalize";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { screen, stylesGlobal, storageResult, apis, lng } from "../../../utils";
import { styles } from "./LoginForm.styles";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [downloadingData, setDownloadingData] = useState(false);
  const navigation = useNavigation();
  const { t } = lng.useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      userPassword: "",
    },
  });

  const onSubmit = (data) => {
    setDownloadingData(true);
    Login(data);
  };
  const Login = async (data) => {
    let dataUserId, dataUserName;
    axios
      .post(apis.GlobalApis.url_token, {
        userName: data.userName,
        password: data.userPassword,
      })
      .then(function (response) {
        const config = {
          headers: { Authorization: `Bearer ${response.data.token}` },
        };
        const bodyParameters = {
          // key: "value"
        };

        dataUserId = response.data.userId;
        dataUserName = response.data.userName;
        // all requests

        const requestlistCheckList = axios
          .get(apis.GlobalApis.url_check_list, config, bodyParameters)
          .catch((errors) => {
            setDownloadingData(false);
            console.error("Error ", apis.GlobalApis.url_check_list, errors);
            return Toast.show({
              type: "error",
              position: "bottom",
              text1: "Aviso",
              text2: t("Home.alertCHK"),
            });
          });

        const requestlistCategory = axios
          .get(apis.GlobalApis.url_list_category, config, bodyParameters)
          .catch((errors) => {
            setDownloadingData(false);
            console.error("Error ", apis.GlobalApis.url_list_category, errors);
            return Toast.show({
              type: "error",
              position: "bottom",
              text1: "Aviso",
              text2: t("Home.alertCT"),
            });
          });

        const requestlistQuestion = axios
          .get(apis.GlobalApis.url_list_question, config, bodyParameters)
          .catch((errors) => {
            setDownloadingData(false);
            console.error("Error ", apis.GlobalApis.url_list_question, errors);
            return Toast.show({
              type: "error",
              position: "bottom",
              text1: "Aviso",
              text2: t("Home.alertQTS"),
            });
          });

        const requestIncidentsRisk = axios
          .get(apis.GlobalApis.url_list_incidents_risk, config, bodyParameters)
          .catch((errors) => {
            setDownloadingData(false);
            console.error("Error ", apis.GlobalApis.url_list_question, errors);
            return Toast.show({
              type: "error",
              position: "bottom",
              text1: "Aviso",
              text2: t("Home.alertRISK"),
            });
          });

        const requestIncidentsRiskSeverity = axios
          .get(
            apis.GlobalApis.url_list_incidents_risk_severity,
            config,
            bodyParameters
          )
          .catch((errors) => {
            setDownloadingData(false);
            console.error("Error ", apis.GlobalApis.url_list_question, errors);
            return Toast.show({
              type: "error",
              position: "bottom",
              text1: "Aviso",
              text2: t("Home.alertSEVERITY"),
            });
          });

        const requestListCountry = axios
          .get(
            apis.GlobalApis.url_list_country,
            config,
            bodyParameters
          )
          .catch((response) => {
            setDownloadingData(false);
            console.error("Error ", apis.GlobalApis.url_list_country, errors);
            return Toast.show({
              type: "error",
              position: "bottom",
              text1: "Aviso",
              text2: "Falta terminar",
            });


          });

        const requestListStora = axios
          .get(
            apis.GlobalApis.utl_list_incidents_stora,
            config,
            bodyParameters
          )
          .catch((response) => {
            setDownloadingData(false);
            console.error("Error ", apis.GlobalApis.utl_list_incidents_stora, errors);
            return Toast.show({
              type: "error",
              position: "bottom",
              text1: "Aviso",
              text2: "Falta terminar",
            });


          });

        axios
          .all([
            requestlistCheckList,
            requestlistCategory,
            requestlistQuestion,
            requestIncidentsRisk,
            requestIncidentsRiskSeverity,
            requestListCountry,
            requestListStora,
          ])
          .then(
            axios.spread(async (...responses) => {
              const responseChecklist = responses[0];
              const responseListCategory = responses[1];
              const responesListQuestion = responses[2];
              const responesListIncidentsRisk = responses[3];
              const responseIncidentsRiskSeverity = responses[4];
              const requestListCountry = responses[5];
              const requestListStora = responses[6];

              const dataChecklist = responseChecklist["data"].data;
              if (dataChecklist) {
                let color = {
                  0: "#F57424_#FFD7BE",
                  1: "#F59B24_#FFE3BE",
                  2: "#F5C524_#FFF0BE",
                };

                let claves = Object.keys(dataChecklist);
                for (let i = 0; i < claves.length; i++) {
                  if (color[i] !== undefined) {
                    const dataColor = color[i].split("_");
                    dataChecklist[i]["color"] = dataColor[0];
                    dataChecklist[i]["backgroundColor"] = dataColor[1];
                  } else {
                    const dataColor = color[1].split("_");
                    dataChecklist[i]["color"] = dataColor[0];
                    dataChecklist[i]["backgroundColor"] = dataColor[1];
                  }
                }
              }

              const dataCategories = JSON.parse(
                responseListCategory.data.replace(/'/g, '"')
              );
              const dataQuestions = JSON.parse(
                responesListQuestion.data.replace(/'/g, '"')
              );

              const DataSession = {
                checkList: responseChecklist["data"],
                dataCategories: dataCategories,
                dataQuestions: dataQuestions,
                dataListIncidentsRisk: responesListIncidentsRisk.data,
                dataIncidentsRiskSeverity: responseIncidentsRiskSeverity.data,
                dataRequestListCountry: requestListCountry.data,
                dataRequestListStora: requestListStora.data,
              };

              await storageResult.storeData("@Session", DataSession);
              await storageResult.storeData("@userId", dataUserId);
              await storageResult.storeData("@userName", dataUserName);
              const DatosStorage = await storageResult.getDataFormat("@Session");
              await storageResult.removeItemValue("@SessionResponse");
              await storageResult.removeItemValue("@SessionResponseImages");
              //await storageResult.removeItemValue("@SessionLanguage");
              await storageResult.removeItemValue("@SessionIdStore");
              await storageResult.removeItemValue("@SessionIdCountry");
              await storageResult.removeItemValue("@SessionResponsibleList");
              await storageResult.removeItemValue("@IdCheklistNotProcessed");
              setDownloadingData(false);
              navigation.navigate(screen.account.tab, {
                screen: screen.account.geocalizacion,
              });
            })
          )
          .catch((errors) => {
            setDownloadingData(false);
            console.error("Error ", errors);
            return Toast.show({
              type: "error",
              position: "bottom",
              text1: "Aviso",
              text2: "Erro ao carregar dados aninhados",
            });
          });
      })
      .catch(function (error) {
        setDownloadingData(false);
        console.log("Error cascada peticiones ", error);
        return Toast.show({
          type: "info",
          position: "bottom",
          text1: "Aviso",
          text2: t("Home.alertPass"),
        });
      });
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: t("Home.requiredUser"),
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View style={styles.containerValidationError}>
            <Input
              placeholder={t("Home.inputUser")}
              containerStyle={styles.input}
              style={styles.fontCustom}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              leftIcon={
                <Icon
                  type="ionicon"
                  size={normalize(30)}
                  name="person-circle-outline"
                  iconStyle={styles.icon}
                />
              }
            />
            {error && (
              <Text style={styles.lblValidationError}>{t("Home.requiredUser")}</Text>
            )}
          </View>
        )}
        name="userName"
      />

      <Controller
        control={control}
        rules={{
          required: t("Home.requiredPass"),
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View style={styles.containerValidationError}>
            <Input
              secureTextEntry={true}
              placeholder={t("Home.inputPass")}
              containerStyle={styles.input}
              style={styles.fontCustom}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              disabledInputStyle={true}
              leftIcon={
                <Icon
                  type="ionicon"
                  name="card-outline"
                  size={normalize(30)}
                  iconStyle={styles.icon}
                />
              }
            />
            {error && (
              <Text style={styles.lblValidationError}>{t("Home.requiredPass")}</Text>
            )}
          </View>
        )}
        name="userPassword"
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(screen.recoveryPassword.tab, {
            screen: screen.recoveryPassword.nickRecovery,
          })
        }
      >
        <Text style={styles.lblSubTitleTwo}>{t("Home.lblSubTitleTwo")} </Text>
      </TouchableOpacity>

      <Button
        title={t("Home.btnLogin")}
        containerStyle={stylesGlobal.btnContainer}
        buttonStyle={styles.btnLogin}
        titleStyle={styles.fontCustom}
        onPress={handleSubmit(onSubmit)}
        loading={downloadingData}
        disabled={downloadingData}
        disabledStyle={styles.btnLogin}
      />
    </View>
  );
}
