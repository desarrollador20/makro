import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, TouchableOpacity, Alert } from "react-native";
import { Image, Text } from "react-native-elements";
import { storageResult, screen } from "../../../utils";
import { styles } from "./Footer.style";
import { useNavigation } from "@react-navigation/native";

export function Footer() {
  const [language, setLanguage] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const DataLenguage = await storageResult.getDataFormat("@SessionLanguage");
    setLanguage(DataLenguage);
  };

  const closeSessionOk = async () => {
    await storageResult.removeItemValue("@SessionResponse");
    await storageResult.removeItemValue("@SessionResponseImages");
    await storageResult.removeItemValue("@SessionLanguage");
    await storageResult.removeItemValue("@SessionIdStore");
    await storageResult.removeItemValue("@SessionIdCountry");
    await storageResult.removeItemValue("@SessionResponsibleList");
    await storageResult.removeItemValue("@Session");
    const valorLenguage = await storageResult.getDataFormat("@SessionLanguage");
    //console.log(DataLenguage2);
    if (!valorLenguage) {
      navigation.navigate(screen.account.tab, {
        screen: screen.account.login,
      });
    }
    else{
      console.log(valorLenguage);
    }
    
  };
  const closeSession = () => {
    Alert.alert(
      "Alerta",
      language == "pt" ? "Tem certeza que deseja sair?" : "¿Seguro quieres salir de sesión?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: language == "pt" ? "Estou certo" : "Estoy seguro",
          onPress: () => closeSessionOk(),
          style: "destructive",

        },
      ]
    );
  };

  if (!language) {
    return <View />;
  }

  return (
    <View style={styles.containerFooter}>
      <View style={styles.containerExit}>
        <TouchableOpacity onPress={() => closeSession()}>
          <Text style={styles.lblExit}>
            {language == "pt" ? "Saída" : "Salida"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerLogo}>
        <Image
          source={require("../../../../assets/img/logoPulse.png")}
          style={styles.imageLogo}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
    </View>
  );
}
