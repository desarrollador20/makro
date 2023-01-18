import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

const Stack = createNativeStackNavigator();

export function AppNavigation() {

  const [session, setSession] = useState(false);
  const { i18n } = lng.useTranslation();
  useEffect(() => {
    CheckedData();
  }, [])

  const CheckedData = async () => {
    const DataLenguage = await storageResult.getDataFormat("@SessionLanguage");
    if (DataLenguage) {
      i18n.changeLanguage(DataLenguage);
      setSession(DataLenguage);
    } else {
      setSession('NA');
    }
  }

  if (!session) {
    return <View><Text>redirecionado....</Text></View>
  }

  return (
    <Stack.Navigator
      initialRouteName={
        session != 'NA' && session !== undefined
          ? screen.home.tab
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


