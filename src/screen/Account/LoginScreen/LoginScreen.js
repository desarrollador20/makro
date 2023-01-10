import React, { useEffect } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { stylesGlobal, storageResult, theme } from "../../../utils";
import { styles } from "./LoginScreen.styles";
import { LoginForm } from "../../../components/Auth";
import SwitchSelector from "react-native-switch-selector";
import { useTranslation } from "react-i18next";

export function LoginScreen() {
  const navigation = useNavigation();
  const [valueRadio, setValueRadio] = React.useState("pt");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    loaderInitchangeLanguageCustom();
  }, []);

  const options = [
    { label: t("Home.langPt"), value: "pt" },
    { label: t("Home.langEs"), value: "es" },
  ];

  const loaderInitchangeLanguageCustom = () => {
    //setValueRadio(newValue);
    storageResult.setItemValueLanguage("pt");
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
              selectedTextStyle={styles.lblTitleRadio}
              textStyle={styles.lblTitleRadio}
              options={options}
              hasPadding
              initial={0}
              selectedColor={"black"}
              buttonColor={theme.GlobalColorsApp.lblRedTertiary}
              borderColor={theme.GlobalColorsApp.lblRedTertiary}
              onPress={(language) => {
                i18n.changeLanguage(language);
                setValueRadio(language);
                storageResult.setItemValueLanguage(language);
              }}
            />
          </View>

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
