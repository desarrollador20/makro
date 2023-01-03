import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Text, Image } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { stylesGlobal, storageResult } from "../../../utils";
import { styles } from "./LoginScreen.styles";
import { LoginForm } from "../../../components/Auth";
import SwitchSelector from "react-native-switch-selector";
import { useTranslation } from "react-i18next";

export function LoginScreen() {
  const navigation = useNavigation();
  const [valueRadio, setValueRadio] = React.useState("pt");
  const options = [
    { label: "Portugues", value: "pt" },
    { label: "Español", value: "es" },
  ];
  const { t, i18n } = useTranslation();
  const changeLanguageCustom = (newValue) => {
    setValueRadio(newValue);
    storageResult.setItemValueLanguage(newValue);
  };

  return (
    <SafeAreaView style={stylesGlobal.contentGlobal}>
      <ScrollView>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"}>
          <Image
            source={require("../../../../assets/img/login_logo.png")}
            style={styles.image}
          />

          <View style={styles.containerSelector}>
            <SwitchSelector
              style={styles.containerSwith}
              options={options}
              hasPadding
              initial={0}
              selectedColor="black"
              buttonColor="red"
              borderColor="red"
              onPress={(language) => {
                i18n.changeLanguage(language);

                setValueRadio(language);
                storageResult.setItemValueLanguage(language);
              }}
            />
          </View>

          <RadioButton.Group
            onValueChange={(newValue) => changeLanguageCustom(newValue)}
            value={valueRadio}
          >
            <View style={styles.containerRadioLanguageGlobal}>
              <View style={styles.containerRadioLanguageP}>
                <Text style={styles.lblRadio}>{t("Home.langPt")}</Text>
                <RadioButton value="pt" color={"red"} />
              </View>
              <View style={styles.containerRadioLanguageE}>
                <Text style={styles.lblRadio}>{t("Home.langEs")}</Text>
                <RadioButton value="es" color={"red"} />
              </View>
            </View>
          </RadioButton.Group>

          <View style={styles.content}>
            <Text style={styles.lblTitle}>{t("Home.title")}</Text>
            <Text style={styles.lblSubTitle}>
              {t("Home.subTitle")}{" "}
              <Text style={styles.lblSubTitleLink}>
                {t("Home.subTitleAct")}
              </Text>
            </Text>
            <LoginForm />

            <View style={styles.containerLogo}>
              <Image
                source={require("../../../../assets/img/logoPulse.png")}
                style={styles.imageLogo}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
