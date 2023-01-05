import React, { useEffect, useState } from "react";
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
import { Footer, HeaderPercentage } from "../../components";
import { ButtonsQuestion } from "../../components/question";
import CustomerHeader from "../../navigation/CustomerHeader";
import { stylesGlobal, theme } from "../../utils";
import { styles } from "./ResponsibleList.style";
import { useTranslation } from "react-i18next";

export function ResponsibleList(props) {
  const dataListResponsable = [
    { label: "Hipólito Patiño Beltrán", value: "110238455" },
    { label: "Camilo Cortez", value: "34455" },
    { label: "Maria Helena Martinez", value: "33455" },
    { label: "Victor Ruiz", value: "334552" },
  ];
  const { route } = props;
  const [listResponsible, setListResponsible] = useState([]);
  const { t, i18n } = useTranslation();
  const [dataResponsable, setDataResponsable] = useState(dataListResponsable);
  const [numConfort, setNumConfort] = useState(0);

  const loaderLanguage = async () => {
    const DataLenguage = await storageResult.getDataFormat("@SessionLanguage");
    i18n.changeLanguage(DataLenguage);
  };

  useEffect(() => {
    loaderLanguage();
  }, []);

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

  const selectedLMAction = (value, idCategory) => {};

  const selectedListAdd = (value, label) => {
    let objData = {};
    var propertyName = value;
    objData = {
      label: label,
      value: value,
    };

    setNumConfort(listResponsible.length + 1);

    setListResponsible([...listResponsible, objData]);
  };
  const deleteItemList = (key) => {
    console.log(listResponsible);
    const newListResponsible = listResponsible.filter(
      (item) => item.value !== key
    );
    setNumConfort(newListResponsible.length);

    setListResponsible(newListResponsible);
  };

  const deleteItem = (key) => {
    console.log(dataResponsable);
    const newDataResponsable = dataResponsable.filter(
      (item) => item.value !== key
    );
    setDataResponsable(newDataResponsable);
  };

  const ItemResponsible = (props) => {
    const { name, value } = props;
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
            deleteItemList(value);
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={stylesGlobal.contentGlobal}>
      <CustomerHeader />
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
                name="gravity"
                onValueChange={(value, index) => {
                  let i = index - 1;
                  selectedListAdd(value, dataResponsable[i].label);
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
          {listResponsible &&
            listResponsible.map((item, key) => {
              //console.log("victor: " +JSON.stringify(item));

              return <ItemResponsible name={item.label} value={item.value} />;
            })}
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={{ ...styles.item, borderColor: "red", opacity: 0.5 }}
            // onPress={() => managerScreen(navigation, id, module, idCheckList)}
            // key={id}
          >
            <View style={{ ...styles.containerIcon }}>
              <Icon
                type="foundation"
                name="dislike"
                style={styles.iconMain}
                color="red"
                size={normalize(30)}
              />
            </View>
            <View style={styles.containerLabels}>
              <Text style={{ ...styles.lblCategoryName, color: "red" }}>
                No conformidades
              </Text>
              <Text style={styles.lblNumQuestions}>
                <Text style={{ color: "#F27629" }}>
                  {numConfort}{" "}
                  <Text style={{ color: "black" }}> ña-conformidad</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.containerArrow}>
              <Icon
                type="ionicon"
                name="arrow-down-circle-outline"
                color="red"
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
