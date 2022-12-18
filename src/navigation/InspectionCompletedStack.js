import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InspectionCompletedScreen } from "../screen/InspectionCompletedScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function InspectionCompletedStack() {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false
            })}
        >
            <Stack.Screen
                name={screen.inspectionCompleted.inspectionCompleted}
                component={InspectionCompletedScreen}
            />
        </Stack.Navigator>
    );
}
