import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { Footer, Loading } from '../../../components';
import { ItemHome } from '../../../components/home';
import CustomerHeader from '../../../navigation/CustomerHeader';
import { screen, stylesGlobal, theme, storageResult } from "../../../utils";
import { styles } from "./HomeScreen.style";
import { useTranslation } from "react-i18next";



export function HomeScreen() {

  const [dataCheckList, setDataCheckList] = useState(false);
  const [language , setLanguage] = useState(null);

  
  const { t, i18n } = useTranslation();
    const loaderLanguage = async () => {
        const DataLenguage = await storageResult.getDataFormat('@SessionLanguage');
        i18n.changeLanguage(DataLenguage);
        setLanguage(DataLenguage);
    
      }

      
      useEffect(() => {
     
        loaderLanguage();
        
    
      }, []);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const DatosStorage = await storageResult.getDataFormat('@Session');
    setDataCheckList(DatosStorage['checkList']['data']);
  }

  const renderItem = ({ item }) => {
    return (<ItemHome
      id={item.idCheckList}
      title={item.nameCheckList}
      num_questions={item.numberQuestion + t("HomeScreen.textQuestion")}
      color={item.color}
      backgroundColor={item.backgroundColor}
      idCheckList={item.idCheckList}
      module={'checklist'}
    />);
  };

  return (
    <>
      <SafeAreaView style={stylesGlobal.contentGlobal}>
        <CustomerHeader selectLanguage={language} />
        {
          dataCheckList ?
            (
              <>
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
              </>
            ) : (
              <Loading show />
            )
        }
      </SafeAreaView>
    </>
  )
}