import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Input, Icon, Button, Text } from "react-native-elements";
import Toast from "react-native-toast-message";
import axios from "axios";
import normalize from "react-native-normalize";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { screen, stylesGlobal, storageResult, apis } from "../../../utils";
import { styles } from "./LoginForm.styles";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      userName: '',
      userPassword: ''
    }
  });

  const onSubmit = (data) => {
    Login(data);
  }

  const Login = async (data) => {

    axios.post(apis.GlobalApis.url_token, {
      userName: data.userName,
      password: data.userPassword
    })
      .then(function (response) {
        const config = {
          headers: { Authorization: `Bearer ${response.data.token}` }
        };
        const bodyParameters = {
          // key: "value"
        };

        const requestlistCheckList = axios.get(apis.GlobalApis.url_check_list, config, bodyParameters);
        const requestlistCategory = axios.get(apis.GlobalApis.url_list_category, config, bodyParameters);
        const requestlistQuestion = axios.get(apis.GlobalApis.url_list_question, config, bodyParameters);
        const requestIncidentsRisk = axios.get(apis.GlobalApis.url_list_incidents_risk, config, bodyParameters);
        const requestIncidentsRiskSeverity = axios.get(apis.GlobalApis.url_list_incidents_risk_severity, config, bodyParameters);

        axios
          .all([requestlistCheckList, requestlistCategory, requestlistQuestion, requestIncidentsRisk, requestIncidentsRiskSeverity])
          .then(
            axios.spread(async (...responses) => {
              const responseChecklist = responses[0];
              const responseListCategory = responses[1];
              const responesListQuestion = responses[2];
              const responesListIncidentsRisk = responses[3];
              const responseIncidentsRiskSeverity = responses[4];

              const dataChecklist = responseChecklist['data'].data;
              if (dataChecklist) {
                let color = {
                  '0': "#F57424_#FFD7BE",
                  '1': "#F59B24_#FFE3BE",
                  '2': "#F5C524_#FFF0BE",
                };

                let claves = Object.keys(dataChecklist);
                for (let i = 0; i < claves.length; i++) {
                  if (color[i] !== undefined) {
                    const dataColor = color[i].split('_');
                    dataChecklist[i]['color'] = dataColor[0];
                    dataChecklist[i]['backgroundColor'] = dataColor[1];
                  } else {
                    const dataColor = color[1].split('_');
                    dataChecklist[i]['color'] = dataColor[0];
                    dataChecklist[i]['backgroundColor'] = dataColor[1];
                  }
                }
              }

              const dataCategories = JSON.parse(responseListCategory.data.replace(/'/g, '"'));
              const dataQuestions = JSON.parse(responesListQuestion.data.replace(/'/g, '"'));

              const DataSession = {
                checkList: responseChecklist['data'],
                dataCategories: dataCategories,
                dataQuestions: dataQuestions,
                dataListIncidentsRisk: responesListIncidentsRisk.data,
                dataIncidentsRiskSeverity: responseIncidentsRiskSeverity.data
              };

              await storageResult.storeData('@Session', DataSession);
              const DatosStorage = await storageResult.getDataFormat('@Session');
              await storageResult.removeItemValue('@SessionResponse');
              await storageResult.removeItemValue('@SessionResponseImages');

              navigation.navigate(screen.account.tab, { screen: screen.account.geocalizacion })

            })
          )
          .catch(errors => {
            console.error('Error ', errors);
          });

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <View >
      <Controller
        control={control}
        rules={{
          required: 'O campo do usuário é obrigatório',
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View style={styles.containerValidationError}>
            <Input
              placeholder="Usuário"
              containerStyle={styles.input}
              style={styles.fontCustom}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              leftIcon={
                <Icon type="ionicon" size={normalize(30)} name="person-circle-outline" iconStyle={styles.icon} />
              } />
            {error && <Text style={styles.lblValidationError}>{error.message}</Text>}
          </View>

        )}
        name="userName"
      />

      <Controller
        control={control}
        rules={{
          required: 'O campo de senha é necessária',
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View style={styles.containerValidationError}>
            <Input
              secureTextEntry={true}
              placeholder="Senha"
              containerStyle={styles.input}
              style={styles.fontCustom}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              disabledInputStyle={true}
              leftIcon={
                <Icon type="ionicon" name="card-outline" size={normalize(30)} iconStyle={styles.icon} />
              }
            />
            {error && <Text style={styles.lblValidationError}>{error.message}</Text>}
          </View>

        )}
        name="userPassword"
      />


      <Text style={styles.lblSubTitleTwo}>Eu esqueci minha senha</Text>
      <Button
        title="Entrar"
        containerStyle={stylesGlobal.btnContainer}
        buttonStyle={styles.btnLogin}
        titleStyle={styles.fontCustom}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}
