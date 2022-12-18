import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoryScreen } from "../screen/CategoryScreen/Category";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function CategoryStack() {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false
            })}
        >
            <Stack.Screen
                name={screen.category.category}
                component={CategoryScreen}
            />
        </Stack.Navigator>
    );
}
