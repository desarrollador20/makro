import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { CheckBox, Icon, Image } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { theme, storageResult, emularClickButom } from '../../../utils';
import { useClickButtom } from '../../../hooks/useClickButtom';
import { styles } from './CheckboxCustom.style';

export function CheckboxCustom(props) {

  const { checkboxSelected, setCheckboxSelected, toDisabledOne, toDisabledTwo, color, icon, title, number, idCategory, idQuestion, idCheckList, numberQuestion, isAnswersImages, imageAnswer, idConfiguration, idAnswer, nameQuestion } = props;
  const { managerScreenQuestion } = useClickButtom();
 

  const validateCheckbox = async (checkboxSelected, setCheckboxSelected, toDisabledOne, toDisabledTwo, number, idCategory, idQuestion, idCheckList, idConfiguration, idAnswer, nameQuestion) => {
    toDisabledOne(false);
    toDisabledTwo(false);
    console.log(nameQuestion);
    await storageResult.setItemValue(idCheckList, idCategory, idQuestion, 'checkboxSelected', number);
    await storageResult.setItemValue(idCheckList, idCategory, idQuestion,'nameQuestion', nameQuestion);
    await storageResult.setItemValue(idCheckList, idCategory, idQuestion, 'IdSurveysMovilResponses', idAnswer);
    await storageResult.setItemValue(idCheckList, idCategory, idQuestion, 'idConfiguration', idConfiguration);
    setCheckboxSelected(!checkboxSelected);
    managerScreenQuestion(idCategory, numberQuestion, idQuestion, 0, 0, idCheckList, 'next', number);
    const StorageResponse = await storageResult.getDataFormat(
      "@SessionResponse"
    );
 


  }



  return (
    isAnswersImages == '0' ? (
      <View style={{ width: '100%' }}>
        <CheckBox
          title={
            <View style={styles.containerTitleCheckbox}>
              <Text
                style={{
                  ...styles.textActiveConforme,
                  color: checkboxSelected ? color : theme.GlobalColorsApp.colorOptionInactive,
                  fontFamily: 'kodchasan-extraLight',
                }}
              >{title}</Text>
              {(checkboxSelected && icon != '') && (
                <View style={styles.containerIconCheckbox}>
                  <Icon
                    type="ionicon"
                    name={icon}
                    iconStyle={styles.iconStyle}
                    color={color}
                    size={normalize(25)}
                  />
                </View>
              )}
            </View>
          }
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checkedColor={checkboxSelected ? color : theme.GlobalColorsApp.colorOptionInactive}
          checked={checkboxSelected}
          containerStyle={{ ...styles.containerCheckbox, borderColor: checkboxSelected ? color : theme.GlobalColorsApp.colorOptionInactive }}
          onPress={() => validateCheckbox(checkboxSelected, setCheckboxSelected, toDisabledOne, toDisabledTwo, number, idCategory, idQuestion, idCheckList, idConfiguration, idAnswer, nameQuestion)}
        />
      </View>
    )

      :

      (
        <>
          <View style={{ width: '50%' }}>
            <View style={{ ...styles.containerAnswerWithIMGmargin, borderColor: checkboxSelected ? color : theme.GlobalColorsApp.colorOptionInactive }}>
              <CheckBox
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={checkboxSelected ? color : theme.GlobalColorsApp.colorOptionInactive}
                checked={checkboxSelected}
                containerStyle={styles.checkboxWithIMG}
                onPress={() => validateCheckbox(checkboxSelected, setCheckboxSelected, toDisabledOne, toDisabledTwo, number, idCategory, idQuestion, idCheckList, idConfiguration, idAnswer, nameQuestion)}
              />
              <View style={styles.containerAsnwerWithIMG}>
                <Image
                  source={{ uri: imageAnswer }}
                  style={styles.imageLogo}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <Text style={styles.labelAnswerWithIMG}>{title}</Text>
            </View>
          </View>
        </>
      )

  )
}