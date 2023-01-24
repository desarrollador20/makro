import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import normalize from "react-native-normalize";
import RNPickerSelect from "react-native-picker-select";
import { Footer, HeaderPercentage, Loading } from "../../components";
import { ButtonsQuestion } from "../../components/question";
import CustomerHeader from "../../navigation/CustomerHeader";
import { stylesGlobal, theme, storageResult, lng, apis } from "../../utils";
import { styles } from "./ResponsibleList.style";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

export function ResponsibleList(props) {
  const { route } = props;
  const [listResponsible, setListResponsible] = useState([]);
  const { t } = lng.useTranslation();
  const [dataResponsable, setDataResponsable] = useState(false);
  const [noConforme, setNoConforme] = useState("");

  const loaderListResponsible = async () => {
    const StorageResponsibleList = await storageResult.getDataFormat("@SessionResponsibleList");
    if (StorageResponsibleList) {
      setListResponsible(StorageResponsibleList);
    }
    //setValueRadio(newValue);
    //torageResult.setItemValueListResponsible();
  };

  const getNoConforn = async () => {
    const idCategory = route.params.id;

    const StorageResponse = await storageResult.getDataFormat("@SessionResponse");
    let no_conforme = 0;
    if (typeof StorageResponse !== undefined && StorageResponse) {
      Object.entries(StorageResponse).forEach(([key, value]) => {
        if (key?.split("|")[1].includes(idCategory) && key.includes("checkboxSelected") && value == "2") {
          no_conforme = no_conforme + 1;
        }
      });
      setNoConforme(no_conforme);
    }
  };


  const getListResponsible = async () => {

    const dataIdCountry = await storageResult.getDataFormat("@SessionIdCountry");
    const dataIdStore = await storageResult.getDataFormat("@SessionIdStore");

    axios({
      method: "get",
      url: `${apis.GlobalApis.url_list_responsible}?PiIdIndicatorsCountry=${dataIdCountry}&PiIdIncidentsStore=${dataIdStore}`,
    }).then(async (response) => {
      const data = response.data.data;
      var listData = [];
      Object.entries(data).forEach(([key, value]) => {
        const item = {
          label: value.name,
          value: value.id.toString(),
        };
        listData.push(item);
      }
      );
      setDataResponsable(listData);

    }).catch((error) => {
      console.log("Error en peticion: " + error);
    }).finally(() => {

    });

  };

  useFocusEffect(
    useCallback(() => {
      getNoConforn();
      loaderListResponsible();
      getListResponsible();
    }, [])
  );


  const pickerStyle = {
    inputIOS: {
      fontFamily: "kodchasan-extraLight",
      color: theme.GlobalColorsApp.btnGray,
      height: normalize(40, "height"),
      padding: normalize(10),
    },
    placeholder: {
      color: theme.GlobalColorsApp.btnGray,
    },
    inputAndroid: {
      fontFamily: "kodchasan-extraLight",
      color: theme.GlobalColorsApp.btnGray,
      height: normalize(50, "height"),
      paddingLeft: normalize(10),
    },
  };


  const selectedListAdd = async (value, label) => {
    console.log("kdatos sin filtrar ", listResponsible);

    const objData = {
      "label": label,
      "value": value,
      "idCategory": route.params.id,
      "idCheckList": route.params.idCheckList,
      "idVC": value + "-" + route.params.id,
    };

    if (listResponsible && listResponsible.some((list) => list.value === objData.value && list.idCategory === objData.idCategory)) {
      return false;
    } else {
      var newList = [
        ...listResponsible,
        objData,
      ]
      await storageResult.storeData("@SessionResponsibleList", newList);
      setListResponsible(newList);
      console.log(newList);
    }

  };
  const deleteItemList = async (value, idC, idVH) => {
    console.log("VIEJA LISTA", listResponsible.length);
    console.log("key: ", value, "value: ", route.params.id, listResponsible);

    const newListResponsible = [];

    listResponsible.map((item) => {
      console.log(item.idVC);
      if (item.idVC != idVH) {

        const objData = {
          "label": item.label,
          "value": item.value,
          "idCategory": item.idCategory,
          "idCheckList": item.idCheckList,
          "idVC": item.idVC
        };
        newListResponsible.push(objData);
      }
      else {
        console.log(item.idVC, " este se elimina");

      }
    });


    setListResponsible(newListResponsible);
    await storageResult.storeData("@SessionResponsibleList", newListResponsible);

  };

  const deleteItem = (key) => {
    const newDataResponsable = dataResponsable.filter(
      (item) => item.value !== key
    );
    setDataResponsable(newDataResponsable);
  };

  const ItemResponsible = (props) => {
    const { name, value, idCategory, idVC } = props;
    return (
      <View style={styles.containerList}>
        <Text style={styles.nameList}>{name}</Text>
        <Icon
          style={styles.iconList}
          type="ionicon"
          color={theme.GlobalColorsApp.btnRed}
          size={normalize(25)}
          name="trash-outline"
          iconStyle={{}}
          onPress={() => {
            deleteItemList(value, idCategory, idVC);
          }}
        />
      </View>
    );
  };


  if (!dataResponsable) {
    return (<Loading show />);
  }

  return (
    <SafeAreaView style={stylesGlobal.contentGlobal}>
      <CustomerHeader t={t} />
      <ScrollView>
        <HeaderPercentage
          idCheckList={route.params.idCheckList}
          idCategory={route.params.id}
          numberQuestion={route.params.numberQuestion + 1}
          insideQuestion={"1"}
        />
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.lblTitle}>{t("ResponsableList.title")}</Text>
            <View style={styles.emulateStyleCombo}>
              <RNPickerSelect
                name="responsible"
                onValueChange={(value, index) => {
                  var i = index - 1;
                  if (value != undefined) {
                    selectedListAdd(value, dataResponsable[i].label);
                  }
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{
                  label: t("ResponsableList.inputPlaceholder"),
                  value: null,
                }}
                dropdownIconColor="red"
                style={pickerStyle}
                items={dataResponsable}
              />
            </View>
          </View>
          {listResponsible && listResponsible.map((item, key) => {
            //console.log("victor: " +JSON.stringify(item));
            if (item.idCategory == route.params.id) {
              return (
                <ItemResponsible
                  name={item.label}
                  value={item.value}
                  idCategory={item.idCategory}
                  idVC={item.idVC}
                  key={key}
                />
              );
            }
          })}
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              ...styles.item,
              borderColor: theme.GlobalColorsApp.colorOptionActiveDisagreed,
            }}
          // onPress={() => managerScreen(navigation, id, module, idCheckList)}
          // key={id}
          >
            <View style={{ ...styles.containerIcon }}>
              <Icon
                type="ionicon"
                name={"thumbs-down-outline"}
                color={theme.GlobalColorsApp.colorOptionActiveDisagreed}
                style={styles.iconMain}
                size={normalize(30)}
              />
            </View>
            <View style={styles.containerLabels}>
              <Text
                style={{
                  ...styles.lblCategoryName,
                  color: theme.GlobalColorsApp.colorOptionActiveDisagreed,
                }}
              >
                {t("ResponsableList.titleBox")}
              </Text>
              <Text style={styles.lblNumQuestions}>
                <Text
                  style={{
                    color: theme.GlobalColorsApp.colorOptionActiveDisagreed,
                  }}
                >
                  {noConforme}{" "}
                  <Text style={{ color: theme.GlobalColorsApp.lblGrayPrimary }}>
                    {" "}
                    {t("ResponsableList.subTitleBox")}
                  </Text>
                </Text>
              </Text>
            </View>
            <View style={styles.containerArrow}>
              <Icon
                type="ionicon"
                name="arrow-down-circle-outline"
                color={theme.GlobalColorsApp.colorOptionActiveDisagreed}
                size={normalize(30)}
              />
            </View>
          </TouchableOpacity>
        </View>

        <ButtonsQuestion
          idCategory={route.params.id}
          numberQuestion={route.params.numberQuestion + 1}
          screenResponsileList={1}
          idCheckList={route.params.idCheckList}
        />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
