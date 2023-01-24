import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(`Error obtained variable for key AsyncStorage ${key}`);
  }
};

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(`Error creating variable for key AsyncStorage ${key}`);
  }
};

const getDataFormat = async (Variable) => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    if (keys.length !== 0) {
      const result = await getData(Variable);
      return result;
    } else {
      console.log(`There is no varieble ${Variable}`);
    }
  } catch (e) {
    console.log(`Error when searching for key AsyncStorage ${e}`);
  }
};

const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

const setItemValue = async (
  idCheckList,
  idCategory,
  idQuestion,
  name,
  value
) => {
  const StorageResponse = await getDataFormat("@SessionResponse");
  var keyData = `${idCheckList}|${idCategory}|${idQuestion}|${name}`;

  if (StorageResponse === null) {
    var ObjData = {};
    ObjData[keyData] = value;
    await storeData("@SessionResponse", ObjData);
  } else {
    StorageResponse[keyData] = value;
    await storeData("@SessionResponse", StorageResponse);
  }
  console.log(JSON.stringify(StorageResponse, null, 3));
};

const setItemValueImages = async (
  idCheckList,
  idCategory,
  idQuestion,
  nameImage,
  base64
) => {
  const SessionResponseImages = await getDataFormat("@SessionResponseImages");
  var keyData = `${idCheckList}|${idCategory}|${idQuestion}|${nameImage}`;

  if (SessionResponseImages === null) {
    var ObjData = {};
    ObjData[keyData] = base64;
    await storeData("@SessionResponseImages", ObjData);
  } else {
    SessionResponseImages[keyData] = base64;
    await storeData("@SessionResponseImages", SessionResponseImages);
  }
  // console.log(JSON.stringify(SessionResponseImages, null, 3));
};

const setItemValueListResponsible = async (id, label) => {
  const SessionResponsibleList = await getDataFormat("@SessionResponsibleList");
  var keyData = `${label}`;

  if (SessionResponsibleList === null) {
    await storeData("@SessionResponsibleList", label);
  } else {
    SessionResponsibleList = label;
    await storeData("@SessionResponsibleList", SessionResponsibleList);
  }
  // console.log(JSON.stringify(SessionResponseImages, null, 3));
};

const setItemValueLanguage = async (value) => {
  //const StorageResponse = await getDataFormat('@SessionLanguage');
  await storeData("@SessionLanguage", value?.trim());
  console.log(value);
};

const setItemValueSendDataFailed = async (value) => {
  const SessionResponseSendDataFailed = await getDataFormat(
    "@SessionResponseSendDataFailed"
  );
  var keyData = `${idCheckList}|${idCategory}`;

  if (SessionResponseSendDataFailed === null) {
    var ObjData = {};
    ObjData[keyData] = base64;
    await storeData("@SessionResponseImages", ObjData);
  } else {
    SessionResponseSendDataFailed[keyData] = base64;
    await storeData("@SessionResponseImages", SessionResponseSendDataFailed);
  }
};

const setItemValueCountry = async (value) => {
  //const StorageResponse = await getDataFormat('@SessionLanguage');
  await storeData("@SessionIdCountry", value);
};

const setItemValueStore = async (value) => {
  //const StorageResponse = await getDataFormat('@SessionLanguage');
  await storeData("@SessionIdStore", value);
};


const setIdCheklistSentNotProcessed = async (idQuestions) => {
  await storeData("@IdCheklistNotProcessed", idQuestions);
};

export const storageResult = {
  getData,
  storeData,
  getDataFormat,
  removeItemValue,
  setItemValue,
  setItemValueImages,
  setItemValueLanguage,
  setItemValueListResponsible,
  setItemValueCountry,
  setItemValueStore,
  setIdCheklistSentNotProcessed

};
