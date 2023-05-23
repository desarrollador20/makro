import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpoConstants, { AppOwnership } from "expo-constants";
import * as Updates from 'expo-updates';
import { PositiveComments } from "../screen/PositiveComments/PositiveComments";
import { screen, storageResult, lng } from "../utils";
import { AccountStack } from "./AccountStack";
import { CategoryStack } from "./CategoryStack";
import { HomeStack } from "./HomeStack";
import { InspectionCompletedStack } from "./InspectionCompletedStack";
import { QuestionStack } from "./QuestionStack";
import { ResponsibleListStack } from "./ResponsibleListStack";
import { RecoveryPasswordStack } from "./RecoveryPasswordStack";
import { View, Text } from "react-native";
import { DetectLacationStack } from "./DetectLocationStack";
import UpdateScreen from "../components/Shared/UpdateScreen/UpdateScreen";

const Stack = createNativeStackNavigator();

export function AppNavigation() {

  const [session, setSession] = useState(false);
  const { i18n } = lng.useTranslation();
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isChecking, setChecking] = useState(true);

  useEffect(() => {
    const checkUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          setUpdateAvailable(true);
        }

      } catch (e) {
        console.log(e)
        // handle or log error
      } finally {
        setChecking(false);
      }
    }

    if (ExpoConstants.appOwnership !== AppOwnership.Expo) {
      checkUpdates();
    } else {
      setChecking(false);
    }

    CheckedData();
  }, [])

  const CheckedData = async () => {
    const DataLenguage = await storageResult.getDataFormat("@SessionLanguage");
    const DataUserId = await storageResult.getDataFormat("@userId");
    if (DataUserId && DataUserId !== null) {
      i18n.changeLanguage(DataLenguage);
      setSession(DataUserId);
    } else {
      setSession('NA');
    }
  }

  if (!session) {
    return <View />; {/* <Text>redirecionado....</Text></View>*/ }
  }

  if (isChecking) {
    return <View />;
  }


  if (updateAvailable) {
    return (<UpdateScreen />);
  } else {

    return (
      <Stack.Navigator
        initialRouteName={
          session != 'NA' && session !== undefined
            ? screen.detectLocation.tab
            : screen.account.tab
        }
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
        })}
      >
        <Stack.Screen
          name={screen.account.tab}
          component={AccountStack}
        />
        <Stack.Screen
          name={screen.detectLocation.tab}
          component={DetectLacationStack}
        />
        <Stack.Screen
          name={screen.home.tab}
          component={HomeStack}
        />
        <Stack.Screen
          name={screen.category.tab}
          component={CategoryStack}
        />
        <Stack.Screen
          name={screen.question.tab}
          component={QuestionStack}
        />
        <Stack.Screen
          name={screen.positiveComments.tab}
          component={PositiveComments}
        />
        <Stack.Screen
          name={screen.responsibleList.tab}
          component={ResponsibleListStack}
        />
        <Stack.Screen
          name={screen.inspectionCompleted.tab}
          component={InspectionCompletedStack}
        />
        <Stack.Screen
          name={screen.recoveryPassword.tab}
          component={RecoveryPasswordStack}
        />
      </Stack.Navigator>
    );

  }
}


