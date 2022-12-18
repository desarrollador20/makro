import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigation } from "./src/navigation/AppNavigation";
import Toast from "react-native-toast-message";
import { LogBox, View } from 'react-native';
import * as Font from 'expo-font';


LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loaderFonts();
  }, [fontsLoaded]);

  const loaderFonts = async () => {
    await Font.loadAsync({
      'kodchasan-extraLight': require('./assets/Kodchasan/Kodchasan-ExtraLight.ttf'),
      'kodchasan-regular': require('./assets//Kodchasan/Kodchasan-Regular.ttf'),
      'kodchasan-bold': require('./assets//Kodchasan/Kodchasan-Bold.ttf'),
    });
    setFontsLoaded(true);
  }

  if (!fontsLoaded) {
    return (<View />);
  }

  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}