import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { screen, storageResult, checkConnected, lng } from "../utils";

export function useClickButtom() {
  const [connectStatus, setConnectStatus] = useState(false);
  const navigation = useNavigation();
  const { t } = lng.useTranslation();

  checkConnected().then((res) => {
    setConnectStatus(res);
  });

  const managerScreenQuestion = async (
    idCategory,
    numberQuestion,
    idQuestion,
    screenPositiveComments = 0,
    screenResponsileList = 0,
    idCheckList,
    action,
    numberOption
  ) => {
    if (parseInt(numberOption) == 2) {
      return;
    }
    const DatosStorage = await storageResult.getDataFormat("@Session");
    let currentNumberQuestion =
      action == "next"
        ? parseInt(numberQuestion) + 1
        : parseInt(numberQuestion) - 1;

    //if you enter here is because you have run out of questions or you are returning to the category menu
    if (
      DatosStorage["dataQuestions"]["questions_" + idCategory]["data"][
      "orden_" + currentNumberQuestion
      ] === undefined
    ) {
      if (screenPositiveComments == 1 && action == "next" && connectStatus) {
        const StorageResponse = await storageResult.getDataFormat(
          "@SessionResponse"
        );
        let disagreed = 0;
        Object.entries(StorageResponse).forEach(([key, value]) => {
          if (
            key.includes(idCategory) &&
            key.includes("checkboxSelected") &&
            value == "2"
          ) {
            disagreed = 1;
            return;
          }
        });

        if (disagreed == 0) {
          return navigation.navigate(screen.category.tab, {
            screen: screen.category.category,
            params: { id: idCategory, idCheckList },
          });
        }
        if (disagreed == 1) {
          return navigation.navigate(screen.responsibleList.tab, {
            screen: screen.responsibleList.responsibleList,
            params: {
              id: idCategory,
              numberQuestion: numberQuestion,
              idCheckList,
            },
          });
        }
      }
      if (screenPositiveComments == 1 && action == "next" && !connectStatus) {
        return navigation.navigate(screen.category.tab, {
          screen: screen.category.category,
          params: { id: idCategory, idCheckList },
        });
      }
      if (screenPositiveComments == 1 && action == "prev") {
        return navigation.navigate(screen.question.tab, {
          screen: screen.question.question,
          params: {
            id: idCategory,
            numberQuestion: numberQuestion,
            idCheckList,
          },
        });
      }
      if (screenResponsileList == 1 && action == "prev") {
        return navigation.navigate(screen.positiveComments.tab, {
          screen: screen.positiveComments.positiveComments,
          params: {
            id: idCategory,
            numberQuestion: currentNumberQuestion,
            idCheckList,
          },
        });
      }
      if (screenResponsileList == 1 && action == "next") {
        return navigation.navigate(screen.category.tab, {
          screen: screen.category.category,
          params: { id: idCategory, idCheckList },
        });
      }
      if (numberQuestion == 0 || (numberQuestion == 1 && action == "prev")) {
        return navigation.navigate(screen.category.tab, {
          screen: screen.category.category,
          params: { id: idCategory, idCheckList },
        });
      } else {
        return navigation.navigate(screen.positiveComments.tab, {
          screen: screen.positiveComments.positiveComments,
          params: {
            id: idCategory,
            numberQuestion: currentNumberQuestion,
            idCheckList,
          },
        });
      }
    }

    return navigation.navigate(screen.question.tab, {
      screen: screen.question.question,
      params: {
        id: idCategory,
        numberQuestion: currentNumberQuestion,
        idCheckList,
      },
    });
  };

  const validarFields = async (
    idCategory,
    numberQuestion,
    idQuestion,
    screenPositiveComments = 0,
    screenResponsileList = 0,
    idCheckList,
    action
  ) => {
    const DatosStorage = await storageResult.getDataFormat("@SessionResponse");
    var keyQuestion = `${idCheckList}|${idCategory}|${idQuestion}|checkboxSelected`;
    var keyObservation = `${idCheckList}|${idCategory}|${idQuestion}|Observations`;
    var keyProposedMeasures = `${idCheckList}|${idCategory}|${idQuestion}|ObservationsProposed`;

    if (screenPositiveComments == 0 && screenResponsileList == 0) {
      if (DatosStorage === null) {
        return Toast.show({
          type: "error",
          position: "bottom",
          text1: t("UseClickButtom.textData"),
          text2: t("UseClickButtom.alertSelect"),
        });
      }
      if (typeof DatosStorage !== undefined) {
        if (DatosStorage[keyQuestion] === undefined && action == "next") {
          return Toast.show({
            type: "error",
            position: "bottom",
            text1: t("UseClickButtom.textData"),
            text2: t("UseClickButtom.alertSelect"),
          });
        }
        if (DatosStorage[keyQuestion] == "2") {
          if (
            DatosStorage[keyObservation] === undefined ||
            DatosStorage[keyObservation] == ""
          ) {
            return Toast.show({
              type: "error",
              position: "bottom",
              text1: t("UseClickButtom.textData"),
              text2: t("UseClickButtom.alertAddObs"),
            });
          }
          if (
            DatosStorage[keyProposedMeasures] === undefined ||
            DatosStorage[keyProposedMeasures] == ""
          ) {
            return Toast.show({
              type: "error",
              position: "bottom",
              text1: t("UseClickButtom.textData"),
              text2: t("UseClickButtom.alertSize"),
            });
          }
        }
      }
    }

    return managerScreenQuestion(
      idCategory,
      numberQuestion,
      idQuestion,
      screenPositiveComments,
      screenResponsileList,
      idCheckList,
      action,
      0
    );
  };

  return {
    managerScreenQuestion,
    validarFields,
  };
}
