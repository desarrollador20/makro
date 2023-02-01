import React, { useCallback } from "react";
import { View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Text, Image } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { stylesGlobal, storageResult, theme, lng, screen } from "../../../utils";
import { styles } from "./LoginScreen.styles";
import { LoginForm } from "../../../components/Auth";
import SwitchSelector from "react-native-switch-selector";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";


export function LoginScreen() {
  const [valueRadio, setValueRadio] = React.useState("pt");
  const { t, i18n } = lng.useTranslation();
  const navigation = useNavigation();


  useFocusEffect(
    useCallback(() => {
      loaderInitchangeLanguageCustom();
    }, [])
  );

  const options = [
    { label: t("Home.langPt"), value: "pt" },
    { label: t("Home.langEs"), value: "es" },
  ];

  const loaderInitchangeLanguageCustom = () => {
    i18n.changeLanguage("pt");
    storageResult.setItemValueLanguage("pt");
    setValueRadio("pt");
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

              <TouchableOpacity
        onPress={() =>
          navigation.navigate(screen.recoveryPassword.tab, {
            screen: screen.recoveryPassword.emailRecovery,
          })
        }
      >
        <Text style={styles.lblSubTitleLink}>
                {t("Home.subTitleAct")} 
              </Text>
      </TouchableOpacity>
              
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
