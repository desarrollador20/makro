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
  const [downloadingData, setDownloadingData] = useState(false);
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
  const onSubmit = (data) => {
    setDownloadingData(true);
    
    if (!inputEmail) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Aviso",
        text2: t("NickRecovery.textNameUserInput"),


      });
     setDownloadingData(false);

      return false;
    } else {
      getDataEmail();
    }
  };
  const getDataEmail = async () => {
 
    axios({
      method: "get",
      url: apis.GlobalApis.url_get_remenber_password+"?userName="+inputEmail+"&sendEmail=true",
    }).then(async (response) => {
      const data = response.data;
     setDownloadingData(false);
      

      if (data) {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Aviso",
          text2: t("NickRecovery.textNick"),
  
        });
        navigation.navigate(screen.account.tab, {
          screen: screen.account.login,
        });
      
  

      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Aviso",
          text2: t("NickRecovery.textUser"),
  
        });
        navigation.navigate(screen.recoveryPassword.tab, {
          screen: screen.recoveryPassword.noConfirm,
        });
      }

    }).catch((error) => {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Aviso",
          text2: t("NickRecovery.textUser"),

      });
    }).finally(() => {

    });
  }
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
          <Text style={styles.lblTitle}>{t("NickRecovery.textNameUserInput")}</Text>

          <View style={styles.containerValidationError}>
            <Input
              placeholder={t("Home.inputUser")}
              style={styles.fontCustom}
              inputContainerStyle={styles.input}
              textStyle={styles.lblTitleRadio}
              //onChangeText={onChange}
              onChangeText={(value) => setInputEmail(value)}
              leftIcon={
                <Icon
                  type="ionicon"
                  size={normalize(30)}
                  name="person-circle-outline"
                  iconStyle={styles.icon}
                  color="#EA0100"
                />
              }
            />

          <Text style={{...styles.lblTitle2, "marginBottom": 10}}>{t("NickRecovery.textPass")}</Text>

          </View>


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
              disabled={downloadingData}
              loading={downloadingData}
            />
          </View>
          
          <View>

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
