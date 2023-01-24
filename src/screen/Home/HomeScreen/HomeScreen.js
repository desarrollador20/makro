import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { Footer, Loading } from '../../../components';
import { ItemHome } from '../../../components/home';
import CustomerHeader from '../../../navigation/CustomerHeader';
import { screen, stylesGlobal, theme, storageResult, lng } from "../../../utils";
import { styles } from "./HomeScreen.style";

export function HomeScreen() {

  const [dataCheckList, setDataCheckList] = useState(false);
  const [dataChecNoSent, setDataChecNoSent] = useState([]);


  const { t } = lng.useTranslation();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const DatosOffline = await storageResult.getDataFormat('@SessionIdCheklistSentNotProcessed');
    setDataChecNoSent[DatosOffline];
    console.log("desde el screem: ",DatosOffline);

    const DatosStorage = await storageResult.getDataFormat('@Session');
    setDataCheckList(DatosStorage['checkList']['data']);
  }

  const renderItem = ({ item, keyExtractor }) => {
    console.log(keyExtractor);
    return (<ItemHome
      id={item.idCheckList}
      title={t("Global.flag") == "pt" ? item.namePortuguese: item.nameCheckList}
      num_questions={item.numberQuestion + t("HomeScreen.textQuestion")}
      color={item.color}
      backgroundColor={item.backgroundColor}
      idCheckList={item.idCheckList}
      module={'checklist'}
      dataChecNoSent={dataChecNoSent}
    />);
  };

  const addStorage = async (data) => {
    //const DatosOffline = await storageResult.getDataFormat('@SessionIdCheklistSentNotProcessed');

    var numR = Math.floor(Math.random() * 6);
    setDataChecNoSent([...dataChecNoSent, numR])
    console.log(numR);
   
   
   await storageResult.setIdCheklistSentNotProcessed(dataChecNoSent);
   const DatosOffline = await storageResult.getDataFormat('@SessionIdCheklistSentNotProcessed');


    console.log("aasdad: ", DatosOffline);

  }

  if (!dataCheckList) {
    return (<Loading show />);
  }


  if (!dataChecNoSent) {
    return (<Loading show />);
  }




  return (
    <>
      <SafeAreaView style={stylesGlobal.contentGlobal}>
        <CustomerHeader t={t} />
        <View style={styles.headerRed}>
          <Icon type="foundation" name="list-thumbnails" color={theme.GlobalColorsApp.lblRedPrimary} size={normalize(28)} />
          <Text style={styles.lblHeaderRed}>{t("HomeScreen.title")}</Text>
        </View>
        <View style={stylesGlobal.contentView}>

          <FlatList
            data={dataCheckList}
            contentContainerStyle={{ paddingVertical: normalize(30, 'height') }}
            renderItem={renderItem}
            keyExtractor={item => item.idCheckList}
          />

        </View>

        <TouchableOpacity
            
            onPress={() => addStorage(dataChecNoSent)}
        >
          <Text>Agregar lista mapa</Text>
          </TouchableOpacity>
        <Footer />
      </SafeAreaView>
    </>
  )
}