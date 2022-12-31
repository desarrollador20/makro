import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Text, Image } from "react-native-elements";
import { RadioButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { stylesGlobal, storageResult } from "../../../utils";
import { styles } from "./LoginScreen.styles";
import { LoginForm } from "../../../components/Auth";

export function LoginScreen() {
  const navigation = useNavigation();
  const [valueRadio, setValueRadio] = React.useState('pt');

  const changeLanguage = (newValue) => {
    setValueRadio(newValue);
    storageResult.setItemValueLanguage(newValue);

  };

  return (
    <SafeAreaView style={stylesGlobal.contentGlobal}>
      <ScrollView >
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
          <Image
            source={require("../../../../assets/img/login_logo.png")}
            style={styles.image}
          />

          <RadioButton.Group onValueChange={(newValue) => changeLanguage(newValue)} value={valueRadio}>
            <View style={styles.containerRadioLanguageGlobal}>
              <View style={styles.containerRadioLanguageP}>
                <Text style={styles.lblRadio}>Portuguese</Text>
                <RadioButton value="pt" color={'red'} />
              </View>
              <View style={styles.containerRadioLanguageE}>
                <Text style={styles.lblRadio}>Spanish</Text>
                <RadioButton value="es" color={'red'} />
              </View>
            </View>
          </RadioButton.Group>

          <View style={styles.content}>
            <Text style={styles.lblTitle}>Inspeção de segurança</Text>
            <Text style={styles.lblSubTitle}>Se você ainda não tem uma conta, você pode  <Text style={styles.lblSubTitleLink}>activar aqui</Text></Text>
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
