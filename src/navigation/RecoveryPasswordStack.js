import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EmailRecoveryScreen } from "../screen/RecoveryPasswordScreen/EmailRecoveryScreen";
import { ConfirmRecoveryScreen } from "../screen/RecoveryPasswordScreen/ConfirmRecoveryScreen";
import { NoConfirmScreen } from "../screen/RecoveryPasswordScreen/NoConfirmScreen/NoConfirmScreen";
import { NickRecoveryScreen } from "../screen/RecoveryPasswordScreen/NickRecoveryScreen/NickRecoveryScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function RecoveryPasswordStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name={screen.recoveryPassword.emailRecovery}
        component={EmailRecoveryScreen}
      />
      <Stack.Screen
        name={screen.recoveryPassword.confirmRecovery}
        component={ConfirmRecoveryScreen}
      />
      <Stack.Screen
        name={screen.recoveryPassword.noConfirm}
        component={NoConfirmScreen}
      />
      
     <Stack.Screen
        name={screen.recoveryPassword.nickRecovery}
        component={NickRecoveryScreen}
    />
    </Stack.Navigator>
  );
}
