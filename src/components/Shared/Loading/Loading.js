import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import { theme } from "../../../utils";
import { styles } from "./Loading.styles";

export function Loading(props) {
  const { show, text = 'Carregando dados...' } = props;

  if (!show) return null;

  return (
    <View style={styles.content}>
      <ActivityIndicator size="large" color={theme.GlobalColorsApp.lblRedPrimary} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}