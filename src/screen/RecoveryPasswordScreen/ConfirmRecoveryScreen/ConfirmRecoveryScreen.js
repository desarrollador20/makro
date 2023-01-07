import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Input, Icon, Button, Text, Image } from "react-native-elements";
import Toast from "react-native-toast-message";
import axios from "axios";
import normalize from "react-native-normalize";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
  screen,
  stylesGlobal,
  storageResult,
  apis,
  theme,
} from "../../../utils";
import { styles } from "../ConfirmRecoveryScreen/ConfirmRecoveryScreen.style";
import { useTranslation } from "react-i18next";

export function ConfirmRecoveryScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
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
    Toast.show({
      type: "error",
      position: "bottom",
      text1: "Aviso",
      text2: "asdsad",
    });
  };

  const onChange = (data) => {
    console.log("changed");
  };

  return (
    <SafeAreaView style={stylesGlobal.contentGlobal}>
      <ScrollView>
        <View style={styles.content}>
          <View
            style={{
              alignItems: "center",
              paddingVertical: 5,
              flexGrow: 1,
              alignContent: "center",
            }}
          >
            <Icon
              type="ionicon"
              size={normalize(30)}
              name="checkmark-outline"
              iconStyle={styles.icon}
              color="white"
              containerStyle={styles.containerStyleIcon}
            />
            <Image
              source={require("../../../../assets/img/logoMakro.png")}
              style={styles.imageLogo}
            />
          </View>

          <Text style={styles.lblTitle}>
            {t("EmailRecovery.textConfirm")} "
            <Text style={{ color: "#F27127" }}>
              {t("EmailRecovery.textConfirm2")}
            </Text>
            ”.
          </Text>

          <View style={styles.containerSelector}>
            <Button
              title={t("EmailRecovery.btnConfirmHome")}
              containerStyle={stylesGlobal.btnContainer}
              titleStyle={styles.fontCustom}
              buttonStyle={{ ...styles.btn, backgroundColor: "#666666" }}
              onPress={() =>
                navigation.navigate(screen.account.tab, {
                  screen: screen.account.login,
                })
              }
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
