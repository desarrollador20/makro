import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";
import { screen, stylesGlobal, theme, storageResult, lng } from "../../../utils";
import { Modal, LoadingModal, Footer } from "../../../components";
import CustomerHeader from '../../../navigation/CustomerHeader';
import { styles } from "./GeocalizacionScreen.style";
import normalize from 'react-native-normalize';


export function GeocalizacionScreen() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const navigation = useNavigation();
  const { t } = lng.useTranslation();


  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const goDetectLocation = () => {
    setShowModal((prevState) => !prevState)
    navigation.navigate(screen.detectLocation.tab, { screen: screen.detectLocation.home })
  }


  useEffect(() => {
    (async () => {

      setRenderComponent(
        <View style={styles.containerModal}>
          <Text style={styles.textModal}>{t("Geolocalizacion.textModal")}</Text>
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
        Alert.alert(t("Geolocalizacion.alertDenied"));
        return;

      }

      let location = await Location.getCurrentPositionAsync()
      setLocation(location);
    })();
  }, []);

  if (!location) {
    return (<LoadingModal show={isLoading} text={t("Geolocalizacion.loeaderMap")} />);
  }

  return (
    <>

      <SafeAreaView style={stylesGlobal.contentGlobal}>
        <CustomerHeader t={t} />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.headerDetect}>
              <Icon type="foundation" name="marker" color={theme.GlobalColorsApp.btnGray} size={normalize(35)} />
              <Text style={styles.lblHeaderDetect}>{t("Geolocalizacion.title")}</Text>
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
                  title={t("Geolocalizacion.myPosition")}
                  description={t("Geolocalizacion.desPosition")}
                >
                </Marker>
                :
                null
              }
            </MapView>
            <View style={stylesGlobal.containerButton}>
              <Button
                title={t("Geolocalizacion.btnOther")}
                titleStyle={styles.fontCustom}
                containerStyle={stylesGlobal.btnContainer}
                buttonStyle={{ ...stylesGlobal.btn, backgroundColor: theme.GlobalColorsApp.btnGrayNext }}
                onPress={() => setShowModal((prevState) => !prevState)}
              />

              <Button
                title={t("Geolocalizacion.btnLocal")}
                titleStyle={styles.fontCustom}
                containerStyle={stylesGlobal.btnContainer}
                buttonStyle={{ ...stylesGlobal.btn, backgroundColor: theme.GlobalColorsApp.btnRed }}
                onPress={() => navigation.navigate(screen.detectLocation.tab, { screen: screen.detectLocation.home })}
              />
            </View>
          </View>
          <Footer />
          <Modal show={showModal} close={onCloseOpenModal}>
            {renderComponent}
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

