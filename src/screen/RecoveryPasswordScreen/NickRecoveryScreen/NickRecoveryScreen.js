import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { Input, Icon, Button, Text, Image } from "react-native-elements";
import Toast from "react-native-toast-message";
import normalize from "react-native-normalize";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { screen, stylesGlobal, theme, lng, apis } from "../../../utils";
import { styles } from "./NickRecoveryScreen.style";
import axios from "axios";



export function NickRecoveryScreen() {
  const navigation = useNavigation();
  const { t } = lng.useTranslation();
  const [inputEmail, setInputEmail] = useState("");
  const emailRegex =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
    },
  });
  const onSubmit = async (data) => {

    axios({
      method: "get",
      url: apis.GlobalApis.url_get_remenber_password+"?userName=jay&sendEmail=true",
    }).then(async (response) => {
      const data = response;
      console.log(data.data);

    }).catch((error) => {
      console.log("Error en peticion: " + error);
    }).finally(() => {

    });

    return false;
    if (!emailRegex.test(inputEmail) && inputEmail) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Aviso",
        text2: t("EmailRecovery.alertNoEmailValide"),
      });
    } else if (!inputEmail) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Aviso",
        text2: t("EmailRecovery.alertNoEmail"),
      });
      return false;
    } else {
      if (inputEmail == "correo@gmail.com") {
        navigation.navigate(screen.recoveryPassword.tab, {
          screen: screen.recoveryPassword.confirmRecovery,
        });
      } else {
        navigation.navigate(screen.recoveryPassword.tab, {
          screen: screen.recoveryPassword.noConfirm,
        });
      }
    }
  };

  const onChange = (event) => {
    setInputEmail(event.target.value);
    console.log(event.target.value);
  };

  return (
    <SafeAreaView style={stylesGlobal.contentGlobal}>
      <ScrollView>
        <View style={styles.content}>
          <Image
            source={require("../../../../assets/img/login_logo.png")}
            style={styles.image}
          />
          <Text style={styles.lblTitle}>Ingrese su nombre de usuario</Text>

          <View style={styles.containerValidationError}>
            <Input
              placeholder="E-mail"
              style={styles.fontCustom}
              inputContainerStyle={styles.input}
              textStyle={styles.lblTitleRadio}
              //onChangeText={onChange}
              onChangeText={(value) => setInputEmail(value)}
              leftIcon={
                <Icon
                  type="ionicon"
                  size={normalize(30)}
                  name="ios-mail"
                  iconStyle={styles.icon}
                  color="#EA0100"
                />
              }
            />
          </View>
          <Text style={styles.lblTitle2}>La contraseña será enviada a su correo registrado</Text>


          <View style={styles.containerSelector}>
            <Button
              title={t("EmailRecovery.btnSubmit")}
              containerStyle={stylesGlobal.btnContainer}
              titleStyle={styles.fontCustom}
              buttonStyle={{
                ...styles.btn,
                backgroundColor: theme.GlobalColorsApp.lblGrayPrimary,
              }}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View style={styles.containerLogo}>
            <Image
              source={require("../../../../assets/img/logoPulse.png")}
              style={styles.imageLogo}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
