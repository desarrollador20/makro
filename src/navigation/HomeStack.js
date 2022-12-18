import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screen/Home/HomeScreen/HomeScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen
        name={screen.home.home}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}
