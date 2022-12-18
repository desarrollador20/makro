import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PositiveComments } from "../screen/PositiveComments/PositiveComments";
import { screen } from "../utils";
import { AccountStack } from "./AccountStack";
import { CategoryStack } from "./CategoryStack";
import { HomeStack } from "./HomeStack";
import { InspectionCompletedStack } from "./InspectionCompletedStack";
import { QuestionStack } from "./QuestionStack";
import { ResponsibleListStack } from "./ResponsibleListStack";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator
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
    </Stack.Navigator>
  );
}


