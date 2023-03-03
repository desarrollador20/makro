import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as Updates from 'expo-updates';
import { Button } from 'react-native-elements';
import Modal from "../Modal/Modal";
import { lng, theme } from '../../../utils';

const UpdateScreen = () => {

  const { t } = lng.useTranslation();

  const onUpdatePress = () => {
    Updates.reloadAsync();
  };

  return (
    <Modal isVisible={true}  >
      <View>
        <Text style={styles.HeaderTitle}>MAKRO</Text>
        <Text style={styles.MensageText}>{t("Global.updateApp")}</Text>
        <Button
          title={t("Global.updateBotton")}
          style={{ width: '100%' }}
          color={'rgba(247, 53, 98, 1)'}
          onPress={onUpdatePress}
        />
      </View>

    </Modal>
  )
}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: theme.GlobalColorsApp.btnRed,
    height: 600
  },

  HeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  HeaderTitle: {
    alignSelf: 'center',
    marginLeft: 2,
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },

  MessageContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center'
  },

  MensageText: {
    fontSize: RFPercentage(2.5),
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20

  }
})

export default UpdateScreen;
