import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { Switch } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { useFocusEffect } from "@react-navigation/native";
import normalize from "react-native-normalize";
import { theme, checkConnected, storageResult, lng, apis } from "../../../utils";
import { PreviousInspection } from "../PreviousInspection";
import { styles } from "./Disagreed.style";
import axios from "axios";


export function Disagreed(props) {
  const { idCategory, idQuestion, idCheckList } = props;
  const [isSwitchRiskAnalysis, setIsSwitchRiskAnalysis] = useState(false);
  const [connectStatus, setConnectStatus] = useState(false);
  const [getGravity, setGetGravity] = useState(false);
  const [getIncidentsProbability, setGetIncidentsProbability] = useState(false);
  const [probability, setProbability] = useState(false);
  const [gravity, setGravity] = useState(false);
  const [sector, setSector] = useState(false);
  const [idSector, setIdSector] = useState(false);
  const { control, handleSubmit, setValue } = useForm({ mode: "onBlur" });
  const { t } = lng.useTranslation();

  useFocusEffect(
    useCallback(() => {
      validateDataInit();
      getSector();

    }, [])
  );

  useEffect(() => {
    GetSelected();
  }, []);

  const GetSelected = async () => {
    const DatosStorage = await storageResult.getDataFormat("@Session");

    var probability = [];
    Object.entries(DatosStorage["dataListIncidentsRisk"]["data"]).forEach(
      ([key, value]) => {
        const item = {
          label: t("Global.flag") == "es" ? value.name : value.namePortuguese,
          value: value.id.toString(),
          key
        };
        probability.push(item);
      }
    );
    setGetIncidentsProbability(probability);

    var gravity = [];
    Object.entries(DatosStorage["dataIncidentsRiskSeverity"]["data"]).forEach(
      ([key, value]) => {
        const item = {
          label: t("Global.flag") == "es" ? value.name : value.namePortuguese,
          value: value.id.toString(),
          key
        };
        gravity.push(item);
      }
    );
    setGetGravity(gravity);
  };

  const getSector = async () => {

    const dataIdCountry = await storageResult.getDataFormat("@SessionIdCountry");
    const dataIdStore = await storageResult.getDataFormat("@SessionIdStore");

    axios({
      method: "get",
      url: `${apis.GlobalApis.url_get_incidents_sector}?PiIdIndicatorsCountry=${dataIdCountry}&PiIdIncidentsStore=${dataIdStore}`,
    }).then(async (response) => {
      const data = response.data.data;
      var sector = [];
      Object.entries(data).forEach(
        ([key, value]) => {
          const itemSector = {
            label: t("Global.flag") == "es" ? value.name : value.namePortuguese,
            value: value.id.toString(),
            latitude: value.latitude,
            longitude: value.longitude,
            key: key

          };
          sector.push(itemSector);
        }
      );
      setSector(sector);
    }).catch((error) => {
      console.log("Error en peticion: " + error);
    }).finally(() => {

    });

  }

  const ValidateSector = async (idCheckList, value, nameElement, idCategory, idQuestion) => {
    storageResult.setItemValue(idCheckList, idCategory, idQuestion, nameElement, value?.trim());
    setIdSector(value);
  };

  const validateDataInit = async () => {
    const DatosStorage = await storageResult.getDataFormat("@SessionResponse");
    if (DatosStorage !== undefined && DatosStorage) {
      var keyObservation = `${idCheckList}|${idCategory}|${idQuestion}|Observations`;
      var keyProposedMeasures = `${idCheckList}|${idCategory}|${idQuestion}|ObservationsProposed`;
      var keyChkRiskAnalysis = `${idCheckList}|${idCategory}|${idQuestion}|IsRiskAnalysis`;
      var keyProbability = `${idCheckList}|${idCategory}|${idQuestion}|IdIncidentsRisk`;
      var keyGravity = `${idCheckList}|${idCategory}|${idQuestion}|IdIncidentsRiskSeverity`;
      var keySector = `${idCheckList}|${idCategory}|${idQuestion}|IdIncidentsSector`;
      setValue("observation", DatosStorage[keyObservation]);
      setValue("proposedMeasures", DatosStorage[keyProposedMeasures]);
      setValue(
        "IsRiskAnalysis",
        setIsSwitchRiskAnalysis(DatosStorage[keyChkRiskAnalysis])
      );
      setProbability(DatosStorage[keyProbability]);
      setGravity(DatosStorage[keyGravity]);
      setIdSector(DatosStorage[keySector]);
    }
  };

  const validateOnBlur = async (
    idCheckList,
    value,
    name,
    idCategory,
    idQuestion
  ) => {
    storageResult.setItemValue(
      idCheckList,
      idCategory,
      idQuestion,
      name,
      value?.trim()
    );
  };

  const selectedLP = async (
    idCheckList,
    value,
    nameElement,
    idCategory,
    idQuestion
  ) => {
    storageResult.setItemValue(
      idCheckList,
      idCategory,
      idQuestion,
      nameElement,
      value?.toString().trim()
    );
    setProbability(value);
  };

  const selectedLG = async (
    idCheckList,
    value,
    nameElement,
    idCategory,
    idQuestion
  ) => {
    storageResult.setItemValue(
      idCheckList,
      idCategory,
      idQuestion,
      nameElement,
      value?.trim()
    );
    setGravity(value);
  };

  const pickerStyle = {
    inputIOS: {
      fontFamily: "kodchasan-extraLight",
      color: theme.GlobalColorsApp.lblRedPrimary,
      height: normalize(40, "height"),
      padding: normalize(10),
    },
    placeholder: {
      color: theme.GlobalColorsApp.lblRedPrimary,
    },
    inputAndroid: {
      fontFamily: "kodchasan-extraLight",
      color: theme.GlobalColorsApp.lblRedPrimary,
      height: normalize(50, "height"),
      paddingLeft: normalize(10),
    },
  };

  checkConnected().then((res) => {
    setConnectStatus(res);
  });

  const onToggleSwitch = async (idCheckList, idCategory, idQuestion) => {
    setIsSwitchRiskAnalysis(!isSwitchRiskAnalysis);
    storageResult.setItemValue(
      idCheckList,
      idCategory,
      idQuestion,
      "IsRiskAnalysis",
      !isSwitchRiskAnalysis
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerRed}>
        <Icon
          type="foundation"
          name="comment"
          color={theme.GlobalColorsApp.lblRedPrimary}
          size={normalize(23)}
        />
        <Text style={styles.lblHeaderRed}>{t("Disagreed.textObs")}</Text>
      </View>
      <View style={styles.containerQuestion}>
        <View style={styles.headerSubTitleQuestion}>
          <Icon
            type="foundation"
            name="info"
            color={theme.GlobalColorsApp.btnGrayPrev}
            size={normalize(22)}
          />
          <Text style={styles.lblSubTitleQuestion}>
            {t("Disagreed.textAddDetail")}
          </Text>
        </View>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View style={styles.containerValidationError}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                onBlur={() =>
                  validateOnBlur(
                    idCheckList,
                    value,
                    "Observations",
                    idCategory,
                    idQuestion
                  )
                }
                onChangeText={onChange}
                value={value}
                style={styles.textArea}
              />
              {error && (
                <Text style={styles.lblValidationError}>{error.message}</Text>
              )}
            </View>
          )}
          name="observation"
        />
      </View>

      <View style={styles.headerRed}>
        <Icon
          type="foundation"
          name="comment"
          color={theme.GlobalColorsApp.lblRedPrimary}
          size={normalize(23)}
        />
        <Text style={styles.lblHeaderRed}>{t("Disagreed.textPro")}</Text>
      </View>
      <View style={styles.containerQuestion}>
        <View style={styles.headerSubTitleQuestion}>
          <Icon
            type="foundation"
            name="info"
            color={theme.GlobalColorsApp.btnGrayPrev}
            size={normalize(22)}
          />
          <Text
            style={{
              ...styles.lblSubTitleQuestion,
              marginRight: normalize(50),
            }}
          >
            {t("Disagreed.textProDetail")}
          </Text>
        </View>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View style={styles.containerValidationError}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                onBlur={() =>
                  validateOnBlur(
                    idCheckList,
                    value,
                    "ObservationsProposed",
                    idCategory,
                    idQuestion
                  )
                }
                onChangeText={onChange}
                value={value}
                style={styles.textArea}
              />
              {error && (
                <Text style={styles.lblValidationError}>{error.message}</Text>
              )}
            </View>
          )}
          name="proposedMeasures"
        />
      </View>
      {connectStatus &&
        <View
          style={{ ...styles.containerQuestion, marginBottom: normalize(30) }}
        >
          <View style={styles.headerSubTitleQuestion}>
            <Icon
              type="foundation"
              name="target-two"
              color={theme.GlobalColorsApp.btnGrayPrev}
              size={normalize(22)}
            />
            <Text style={styles.lblSubTitleQuestion}>
              {t("Disagreed.textSector")}
            </Text>
          </View>
          <View style={styles.emulateStyleCombo}>
            <RNPickerSelect
              name="sector"
              onValueChange={(value) =>
                ValidateSector(idCheckList,
                  value,
                  "IdIncidentsSector",
                  idCategory,
                  idQuestion)
              }
              dropdownIconColor="red"
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: t("Disagreed.inputTextSector"),
                value: null,
              }}
              style={pickerStyle}
              items={sector}
              value={idSector && idSector}
            />
          </View>
        </View>
      }

      <View style={styles.containerRiskAalysis}>
        <Switch
          value={isSwitchRiskAnalysis}
          color={
            isSwitchRiskAnalysis
              ? theme.GlobalColorsApp.colorSwichtActive
              : theme.GlobalColorsApp.colorSwicht
          }
          onValueChange={() =>
            onToggleSwitch(idCheckList, idCategory, idQuestion)
          }
          name="IsRiskAnalysis"
          style={styles.SwitchStyle}
        />
        <Text
          style={{
            ...styles.labelSwicht,
            color: isSwitchRiskAnalysis
              ? theme.GlobalColorsApp.colorSwichtActive
              : theme.GlobalColorsApp.colorSwicht,
          }}
        >
          {t("Disagreed.textRisk")}
        </Text>
        <Icon
          type="ionicon"
          name="help-circle-outline"
          style={styles.iconSwicht}
          color={
            isSwitchRiskAnalysis
              ? theme.GlobalColorsApp.colorSwichtActive
              : theme.GlobalColorsApp.lblGrayPrimary
          }
          size={normalize(30)}
        />
      </View>


      {!isSwitchRiskAnalysis ? (
        <View style={styles.headerRedRisk}>
          <Icon
            type="ionicon"
            name="warning-outline"
            color={theme.GlobalColorsApp.lblRedPrimary}
            size={normalize(30)}
          />
          <Text style={styles.lblHeaderRedSwicht}>
            {t("Disagreed.textRiskDetail")}
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.containerQuestion}>
            <View style={styles.headerSubTitleQuestion}>
              <Icon
                type="foundation"
                name="info"
                color={theme.GlobalColorsApp.btnGrayPrev}
                size={normalize(22)}
              />
              <Text
                style={{
                  ...styles.lblSubTitleQuestion,
                  marginRight: normalize(40),
                }}
              >
                {t("Disagreed.textRiskQuest2")}
              </Text>
            </View>
            <View style={styles.emulateStyleCombo}>
              <RNPickerSelect
                name="probability"
                onValueChange={(value) =>
                  selectedLP(
                    idCheckList,
                    value,
                    "IdIncidentsRisk",
                    idCategory,
                    idQuestion
                  )
                }
                dropdownIconColor="red"
                useNativeAndroidPickerStyle={false}
                placeholder={{
                  label: t("Disagreed.textList"),
                  value: null,
                }}
                style={pickerStyle}
                items={getIncidentsProbability}
                value={probability && probability}
              />
            </View>
          </View>

          <View
            style={{ ...styles.containerQuestion, marginTop: normalize(10) }}
          >
            <View style={styles.headerSubTitleQuestion}>
              <Icon
                type="foundation"
                name="info"
                color={theme.GlobalColorsApp.btnGrayPrev}
                size={normalize(22)}
              />
              <Text style={styles.lblSubTitleQuestion}>
                {t("Disagreed.textRiskQuest")}
              </Text>
            </View>
            <View style={styles.emulateStyleCombo}>
              <RNPickerSelect
                name="gravity"
                onValueChange={(value) =>
                  selectedLG(
                    idCheckList,
                    value,
                    "IdIncidentsRiskSeverity",
                    idCategory,
                    idQuestion
                  )
                }
                useNativeAndroidPickerStyle={false}
                placeholder={{
                  label: t("Disagreed.textList"),
                  value: null,
                }}
                dropdownIconColor="red"
                style={pickerStyle}
                items={getGravity}
                value={gravity && gravity}
              />
            </View>
          </View>
          {connectStatus && <PreviousInspection idQuestion={idQuestion} lang={t("Global.flag") == "es" ? 1 : 2} />}
        </>
      )}
    </View>
  );
}
