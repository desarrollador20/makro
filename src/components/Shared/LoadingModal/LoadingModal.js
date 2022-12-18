import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Overlay, Text } from "react-native-elements";
import { theme } from "../../../utils";
import { styles } from "./LoadingModal.styles";

export function LoadingModal(props) {
  const { show, text } = props;

  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size="large" color={theme.GlobalColorsApp.lblRedPrimary} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

LoadingModal.defaultProps = {
  show: false,
};
