import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { DetectLocationScreen } from "../screen/Account/DetectLocationScreen";

const Stack = createNativeStackNavigator();

export function DetectLacationStack() {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false
            })}
        >
            <Stack.Screen
                name={screen.detectLocation.home}
                component={DetectLocationScreen}
            />
        </Stack.Navigator>
    );
}
