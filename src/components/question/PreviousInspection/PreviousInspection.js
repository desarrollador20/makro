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
    const dataIdCountry = await storageResult.getDataFormat(
      "@SessionIdCountry"
    );
    const dataIdStore = await storageResult.getDataFormat("@SessionIdStore");

    axios({
      method: "get",
      url: `${apis.GlobalApis.url_get_surveys_movil_details_questions_last}?PiIdIndicatorsLanguages=${lang}&PiIdIndicatorsCountry=${dataIdCountry}&PiIdIncidentsStore=${dataIdStore}&PiIdSurveysMovilQuestions=${idQuestion}`,
    })
      .then(async (response) => {
        const data = response.data.data;
      
        if (data) {
        
        const createSplit = data[0].create.split(" ");
      
        console.log("paso por aca victor");
        var statusPosition;
        if(data[0].position == 1){
          statusPosition = {
            label: t("PreviousInspection.btnlike"),
            color: theme.GlobalColorsApp.colorOptionActive,
            icono: "thumbs-up-outline"
          }
        }
        else if(data[0].position == 2){
          statusPosition = {
            label: t("PreviousInspection.btnDislike"),
            color: theme.GlobalColorsApp.colorOptionActiveDisagreed,
            icono: "thumbs-up-outline"
          }

        }
        else{
          statusPosition = {
            label: t("PreviousInspection.btnNoAplica"),
            color: theme.GlobalColorsApp.colorOptionInactive,
            icono: "md-help-circle"
          }

        }

        const objData = {
          id: data[0].id,
          create: createSplit[0],
          //create: Date(data[0].create),
          nameResponses: data[0].nameResponses,
          observations: data[0].observations,
          observationsProposed: data[0].observationsProposed,
          nameSector: data[0].nameSector,
          nameRisk: data[0].nameRisk,
          nameSeverity: data[0].nameSeverity,
          position: data[0].position == 2 ? true : false,
          statusPosition: statusPosition
        };
        setObjData(objData);
      }
      })
      .catch((error) => {
        console.log("Error en peticion: " + error);
      })
      .finally(() => {});
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

      {getHistory &&  (
        <View style={styles.containerHistorial}>
         
            <View style={styles.row}>
              <Text style={styles.lblQuestionHistory}>
                {t("PreviousInspection.textQuestionHistory")}
              </Text>
              <Text style={styles.lblResponseHistory}>{objData.create}</Text>
            </View>
            {objData.statusPosition ? (
         
            <View style={styles.row}>
              <Text style={{ ...styles.lblQuestionHistory, flex: 3 }}>
                Resultado:
              </Text>
              <CheckboxHistory
                color={objData.statusPosition ? objData.statusPosition.color : theme.GlobalColorsApp.colorOptionInactive}
                icon={objData.statusPosition ? objData.statusPosition.icono : "md-help-circle"}
                title={objData.statusPosition ? objData.statusPosition.label: t("PreviousInspection.btnNoAplica")}
              />
            </View>
              )
              : (
                <View style={styles.row}>
                  <Text style={{ ...styles.lblQuestionHistory, flex: 3 }}>
                    {t("PreviousInspection.textNoData")}
                  </Text>
                </View>
              )}
         
          {objData.position && (
            <RowColumnHistory
              title={t("PreviousInspection.textObs")}
              description={objData.observations}
            />
          )}
          {objData.position && (
            <RowColumnHistory
              title={t("PreviousInspection.textMp")}
              description={objData.observationsProposed}
            />
          )}
          {objData.position && (
            <RowColumnHistory
              title={t("PreviousInspection.textS")}
              description={objData.nameSector}
            />
          )}
          {objData.position && (
            <RowColumnHistory
              title={t("PreviousInspection.textPa")}
              description={objData.nameRisk}
            />
          )}
          {objData.position && (
            <RowColumnHistory
              title={t("PreviousInspection.textGpo")}
              description={objData.nameSeverity}
            />
          )}
        </View>
      )}
    </>
  );
}
