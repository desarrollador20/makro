import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screen/Account/LoginScreen";
import { GeocalizacionScreen } from "../screen/Account/GeocalizacionScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen
        name={screen.account.login}
        component={LoginScreen}
      />
      <Stack.Screen
        name={screen.account.geocalizacion}
        component={GeocalizacionScreen}
      />
    </Stack.Navigator>
  );
}
