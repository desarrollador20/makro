import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ResponsibleList } from "../screen/ResponsibleList";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function ResponsibleListStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen
        name={screen.responsibleList.responsibleList}
        component={ResponsibleList}
      />
    </Stack.Navigator>
  );
}
