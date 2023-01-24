import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import normalize from "react-native-normalize";
import { theme, lng, apis, storageResult } from "../../../utils";
import { styles } from "./PreviousInspection.style";
import axios from "axios";

export function PreviousInspection(props) {
  const { idQuestion, lang } = props;
  const [getHistory, setGetHistory] = useState(false);
  const [objData, setObjData] = useState({});
  const { t } = lng.useTranslation();

  const RowColumnHistory = (props) => {
    const { title, description } = props;
    return (
      <View style={styles.rowColumn}>
        <Text style={styles.lblQuestionHistory}>{title}</Text>
        <Text style={styles.lblResponseHistory}>{description}</Text>
      </View>
    );
  };

  const CheckboxHistory = (props) => {
    const { color, icon, title } = props;
    return (
      <View style={{ ...styles.containerTitleCheckbox, borderColor: color }}>
        <Text style={{ ...styles.textActiveConforme, color: color }}>
          {title}
        </Text>
        {icon != "" && (
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
    );
  };

  const GetHistory = (idQuestion) => {
    setGetHistory(!getHistory);
  };

  const getDataDisagreed = async () => {

    const dataIdCountry = await storageResult.getDataFormat("@SessionIdCountry");
    const dataIdStore = await storageResult.getDataFormat("@SessionIdStore");

    axios({
      method: "get",
      url: `${apis.GlobalApis.url_get_surveys_movil_details_questions_last}?PiIdIndicatorsLanguages=${lang}&PiIdIndicatorsCountry=${dataIdCountry}&PiIdIncidentsStore=${dataIdStore}&PiIdSurveysMovilQuestions=${idQuestion}`,
    }).then(async (response) => {

      const data = response.data.data;
      const createSplit = data[0].create.split(' ');
      const objData = {
        id: data[0].id,
        create: createSplit[0],
        //create: Date(data[0].create),
        nameResponses: data[0].nameResponses,
        observations: data[0].observations,
        observationsProposed: data[0].observationsProposed,
        nameSector: data[0].nameSector,
        nameRisk: data[0].nameRisk,
        nameSeverity: data[0].nameSeverity
      }
      setObjData(objData);

    }).catch((error) => {
      console.log("Error en peticion: " + error);
    }).finally(() => {

    });

  };

  useFocusEffect(
    useCallback(() => {

      getDataDisagreed();
    }, [])
  );


  return (
    <>
      <Pressable
        onPress={() => GetHistory(idQuestion)}
        style={styles.container}
      >
        <Icon
          type="foundation"
          name="clock"
          style={styles.iconTitle}
          color={theme.GlobalColorsApp.colorTextPreviousInspection}
          size={normalize(30)}
        />
        <Text style={styles.lblSubTitleQuestion}>
          {t("PreviousInspection.showPreIns")}
        </Text>
      </Pressable>

      {getHistory && (
        <View style={styles.containerHistorial}>
          <View style={styles.row}>
            <Text style={styles.lblQuestionHistory}>
              {t("PreviousInspection.textQuestionHistory")}
            </Text>
            <Text style={styles.lblResponseHistory}>{objData.create}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ ...styles.lblQuestionHistory, flex: 3 }}>
              Resultado:
            </Text>
            <CheckboxHistory
              color={theme.GlobalColorsApp.colorOptionActiveDisagreed}
              icon={"thumbs-down-outline"}
              title={t("PreviousInspection.btnDislike")}
            />
          </View>

          <RowColumnHistory
            title={t("PreviousInspection.textObs")}
            description={
              objData.observations
            }
          />
          <RowColumnHistory
            title={t("PreviousInspection.textMp")}
            description={
              objData.observationsProposed
            }
          />
          <RowColumnHistory
            title={t("PreviousInspection.textS")}

            description={objData.nameSector}
          />
          <RowColumnHistory
            title={t("PreviousInspection.textPa")}
            description={objData.nameRisk}

          />
          <RowColumnHistory
            title={t("PreviousInspection.textGpo")}
            description={objData.nameSeverity}

          />
        </View>
      )}
    </>
  );
}
