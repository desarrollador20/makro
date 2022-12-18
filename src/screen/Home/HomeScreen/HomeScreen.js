import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { Footer, Loading } from '../../../components';
import { ItemHome } from '../../../components/home';
import CustomerHeader from '../../../navigation/CustomerHeader';
import { screen, stylesGlobal, theme, storageResult } from "../../../utils";
import { styles } from "./HomeScreen.style";

export function HomeScreen() {

  const [dataCheckList, setDataCheckList] = useState(false);

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
      num_questions={`${item.numberQuestion} perguntas`}
      color={item.color}
      backgroundColor={item.backgroundColor}
      idCheckList={item.idCheckList}
      module={'checklist'}
    />);
  };

  return (
    <>
      <SafeAreaView style={stylesGlobal.contentGlobal}>
        <CustomerHeader />
        {
          dataCheckList ?
            (
              <>
                <View style={styles.headerRed}>
                  <Icon type="foundation" name="list-thumbnails" color={theme.GlobalColorsApp.lblRedPrimary} size={normalize(28)} />
                  <Text style={styles.lblHeaderRed}>Selecione Checklist</Text>
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