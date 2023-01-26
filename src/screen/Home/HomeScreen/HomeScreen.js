import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { useFocusEffect } from "@react-navigation/native";
import { Footer, Loading } from '../../../components';
import { ItemHome } from '../../../components/home';
import CustomerHeader from '../../../navigation/CustomerHeader';
import { screen, stylesGlobal, theme, storageResult, lng } from "../../../utils";
import { styles } from "./HomeScreen.style";

export function HomeScreen() {

  const [dataCheckList, setDataCheckList] = useState(false);
  const [dataChecNoSent, setDataChecNoSent] = useState([]);


  const { t } = lng.useTranslation();

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    const DatosOffline = await storageResult.getDataFormat('@IdCheklistNotProcessed');
    if (DatosOffline && Object.entries(DatosOffline).length !== 0) {
      setDataChecNoSent(DatosOffline);
    } else {
      setDataChecNoSent([]);
    }

    const DatosStorage = await storageResult.getDataFormat('@Session');
    setDataCheckList(DatosStorage['checkList']['data']);
  }

  const renderItem = ({ item, keyExtractor }) => {
    console.log(keyExtractor);
    return (<ItemHome
      id={item.idCheckList}
      title={t("Global.flag") == "pt" ? item.namePortuguese : item.nameCheckList}
      num_questions={item.numberQuestion + t("HomeScreen.textQuestion")}
      color={item.color}
      backgroundColor={item.backgroundColor}
      idCheckList={item.idCheckList}
      module={'checklist'}
      dataChecNoSent={dataChecNoSent}
    />);
  };

  if (!dataCheckList) {
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
        <Footer />
      </SafeAreaView>
    </>
  )
}