import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";
import { screen, stylesGlobal, theme } from "../../../utils";
import { Modal, LoadingModal, Footer } from "../../../components";
import CustomerHeader from '../../../navigation/CustomerHeader';
import { styles } from "./GeocalizacionScreen.style";
import normalize from 'react-native-normalize';
import { useTranslation } from "react-i18next";


export function GeocalizacionScreen() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [renderComponent, setRenderComponent] = useState(null);
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();


  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const goDetectLocation = () => {
    setShowModal((prevState) => !prevState)
    navigation.navigate(screen.account.tab, { screen: screen.account.detectLocation })
  }

  useEffect(() => {
    (async () => {

      setRenderComponent(
        <View style={styles.containerModal}>
          <Text style={styles.textModal}>Você está usando um local diferente de uma loja MAKRO, você pode continuar o registro, entretanto, o sistema irá gerar a seguinte mensagem</Text>
          <Button
            title="Continuar"
            containerStyle={stylesGlobal.btnContainer}
            titleStyle={styles.fontCustom}
            buttonStyle={styles.btnModal}
            onPress={() => goDetectLocation()}
          />
        </View>
      );

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync()
      setLocation(location);
    })();
  }, []);

  return (
    <>

      <SafeAreaView style={stylesGlobal.contentGlobal}>
        <CustomerHeader />
        <ScrollView>
          {
            location == null
              ?
              (<LoadingModal show={isLoading} text="Carregando mapa..." />)
              :
              (
                <>
                  <View style={styles.container}>
                    <View style={styles.headerDetect}>
                      <Icon type="foundation" name="marker" color={theme.GlobalColorsApp.btnGray} size={normalize(35)} />
                      <Text style={styles.lblHeaderDetect}>Detectar localização</Text>
                      <Text style={styles.lblHeaderRed}>{t("Home.inputUser")} ss</Text>
                    </View>
                    <MapView
                      style={styles.map}
                      initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.006757,
                        longitudeDelta: 0.006757,
                      }}
                    >
                      {location.coords
                        ? <Marker
                          coordinate={location.coords}
                          title='My Position'
                          description='Aqui estoy yo'
                        >
                        </Marker>
                        :
                        null
                      }
                    </MapView>
                    <View style={stylesGlobal.containerButton}>
                      <Button
                        title="usar outro"
                        titleStyle={styles.fontCustom}
                        containerStyle={stylesGlobal.btnContainer}
                        buttonStyle={{ ...stylesGlobal.btn, backgroundColor: theme.GlobalColorsApp.btnGrayNext }}
                        onPress={() => setShowModal((prevState) => !prevState)}
                      />

                      <Button
                        title="use este local"
                        titleStyle={styles.fontCustom}
                        containerStyle={stylesGlobal.btnContainer}
                        buttonStyle={{ ...stylesGlobal.btn, backgroundColor: theme.GlobalColorsApp.btnRed }}
                        onPress={() => navigation.navigate(screen.account.tab, { screen: screen.account.detectLocation })}
                      />
                    </View>
                  </View>
                  <Footer />
                </>
              )
          }
          <Modal show={showModal} close={onCloseOpenModal}>
            {renderComponent}
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

