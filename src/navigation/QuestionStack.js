import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { QuestionScreen } from "../screen/QuestionScreen/QuestionScreenView";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function QuestionStack() {
  return (
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false
        })}
      >
      <Stack.Screen
        name={screen.question.question}
        component={QuestionScreen}
      />
    </Stack.Navigator>
  );
}
