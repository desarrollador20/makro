import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import normalize from "react-native-normalize";
import { useNavigation } from "@react-navigation/native";
import { Footer } from "../../../components";
import CustomerHeader from "../../../navigation/CustomerHeader";
import RNPickerSelect from "react-native-picker-select";
import {
    screen,
    stylesGlobal,
    theme,
    apis,
    storageResult,
    lng
} from "../../../utils";
import { styles } from "./DetectLocation.style";
import axios from "axios";

export function DetectLocationScreen() {
    const navigation = useNavigation();
    const { t } = lng.useTranslation();
    const [dataCountry, setDataCountry] = useState(false);
    const [dataStora, setDataStora] = useState([]);
    const [itemValueCountry, setItemValueCountry] = useState("");
    const [itemValueStore, setItemValueStore] = useState("");

    const pickerStyle = {
        inputIOS: {
            fontFamily: "kodchasan-extraLight",
            color: theme.GlobalColorsApp.btnGray,
            height: normalize(40, "height"),
            margin: normalize(12, "width"),
            borderWidth: 1,
            padding: normalize(10),
            borderColor: theme.GlobalColorsApp.btnGrayPrev,
        },
        placeholder: {
            color: theme.GlobalColorsApp.btnGrayPrev,
        },
        inputAndroid: {
            fontFamily: "kodchasan-extraLight",
            color: theme.GlobalColorsApp.btnGray,
            height: normalize(40, "height"),
            margin: normalize(12, "width"),
            borderWidth: 1,
            padding: normalize(10),
            borderColor: theme.GlobalColorsApp.btnGrayPrev,
        },
    };

    useEffect(() => {
        loeaderList();
    }, []);

    const loeaderList = async () => {

    const DatosStorage = await storageResult.getDataFormat("@Session");
    const storageIdCountry = await storageResult.getDataFormat("@SessionIdCountry");
    const storageIdStore = await storageResult.getDataFormat("@SessionIdStore");

    const listStorageCountry = [];
    const arrayValueStora = [];
    Object.entries(DatosStorage["dataRequestListCountry"]["data"]).forEach(
        ([key, value]) => {
          const item = {
            label: t("Global.flag") == "es" ? value.name : value.namePortuguese,
            value: value.id.toString(),
          };
          listStorageCountry.push(item);
        }
      );
      Object.entries(DatosStorage["dataRequestListStora"]["data"]).forEach(
        ([key1, value1]) => {
          const item = {
            label: t("Global.flag") == "es" ? value1.name : value1.namePortuguese,
            value: value1.id.toString(),
          };
          arrayValueStora.push(item);
        }
      );
        
      setItemValueCountry(storageIdCountry);
      setDataCountry(listStorageCountry);
      //list stora
      setItemValueStore(storageIdStore);
      setDataStora(arrayValueStora);
    };
    
    const onValueChangeCountry = async (value) => {
        await storageResult.storeData("@SessionIdCountry", value);
    };

    if (!dataCountry) {
        return (<View />); // victor colocar loading
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={stylesGlobal.contentGlobal}>
                <CustomerHeader t={t} />
                <View style={styles.headerRed}>
                    <Icon
                        type="foundation"
                        name="marker"
                        color={theme.GlobalColorsApp.lblRedPrimary}
                        size={normalize(35)}
                    />
                    <Text style={styles.lblHeaderRed}>{t("DetectLocation.title")}</Text>
                </View>

                <View style={styles.containerForm}>
                    <View style={styles.containerLblInput}>
                        <Icon
                            type="foundation"
                            name="marker"
                            color={theme.GlobalColorsApp.lblGrayPrimary}
                            size={normalize(35)}
                        />
                        <Text style={styles.lblInput}>BU/País</Text>
                    </View>

                    <RNPickerSelect
                        name="idCountry"
                        value={itemValueCountry}
                        onValueChange={(value, index) => {
                            onValueChangeCountry(value);
                        }}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                            label: "Seleccionar pais",
                            value: null,
                        }}
                        dropdownIconColor={theme.GlobalColorsApp.btnRed}
                        style={pickerStyle}
                        items={dataCountry}
                    />

                    <View
                        style={{
                            ...styles.containerLblInput,
                            marginTop: normalize(30, "height"),
                        }}
                    >
                        <Icon
                            type="ionicon"
                            name="business-outline"
                            color={theme.GlobalColorsApp.lblGrayPrimary}
                            size={normalize(30)}
                        />
                        <Text style={styles.lblInput}>{t("DetectLocation.labelShop")}</Text>
                    </View>

                    <RNPickerSelect
                        name="idStora"
                        value={itemValueStore}
                        onValueChange={async (value, index) => {
                            //selectedListAdd(value, dataResponsable[i].label);
                            await storageResult.storeData("@SessionIdStore", value);
                        }}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                            label: "Seleccionar tienda",
                            value: "",
                        }}
                        dropdownIconColor={theme.GlobalColorsApp.btnRed}
                        style={pickerStyle}
                        items={dataStora}
                    />

                    <Button
                        title={t("DetectLocation.btnInit")}
                        containerStyle={{
                            ...stylesGlobal.btnContainer,
                            marginTop: normalize(25),
                        }}
                        buttonStyle={styles.startInspection}
                        titleStyle={styles.fontCustom}
                        onPress={() =>
                            navigation.navigate(screen.home.tab, { screen: screen.home.home })
                        }
                    />
                </View>
                <Footer />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
