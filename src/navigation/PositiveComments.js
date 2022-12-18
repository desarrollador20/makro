import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { PositiveComments } from "../screen/PositiveComments";

const Stack = createNativeStackNavigator();

export function PositiveCommentsStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen
        name={screen.positiveComments.positiveComments}
        component={PositiveComments}
      />
    </Stack.Navigator>
  );
}
