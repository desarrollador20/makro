import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import { theme } from "../../../utils";
import { styles } from "./Loading.styles";
import { useTranslation } from "react-i18next";

export function Loading(props) {
  const { t, i18n } = useTranslation();

  const loaderLanguage = async () => {
    const DataLenguage = await storageResult.getDataFormat("@SessionLanguage");
    i18n.changeLanguage(DataLenguage);
  };

  const { show, text = t("Geolocalizacion.loeaderMap") } = props;

  if (!show) return null;

  return (
    <View style={styles.content}>
      <ActivityIndicator
        size="large"
        color={theme.GlobalColorsApp.lblRedPrimary}
      />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}
