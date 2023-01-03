import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import normalize from "react-native-normalize";
import { theme } from "../../../utils";
import { styles } from "./PreviousInspection.style";
import { useTranslation } from "react-i18next";

export function PreviousInspection(props) {
  const { idQuestion } = props;
  const [getHistory, setGetHistory] = useState(false);
  const { t, i18n } = useTranslation();

  const loaderLanguage = async () => {
    const DataLenguage = await storageResult.getDataFormat("@SessionLanguage");
    i18n.changeLanguage(DataLenguage);
  };
  useEffect(() => {
    loaderLanguage();
  }, []);

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
            <Text style={styles.lblResponseHistory}>XX/XX/XXXX</Text>
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
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris elit enim, lobortis."
            }
          />
          <RowColumnHistory
            title={t("PreviousInspection.textMp")}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris elit enim, lobortis."
            }
          />
          <RowColumnHistory
            title={t("PreviousInspection.textS")}
            description={t("PreviousInspection.texttS")}
          />
          <RowColumnHistory
            title={t("PreviousInspection.textPa")}
            description={"1 (Mutio Baixo)"}
          />
          <RowColumnHistory
            title={t("PreviousInspection.textGpo")}
            description={"Fatalidade, invalidez, amputação"}
          />
        </View>
      )}
    </>
  );
}
