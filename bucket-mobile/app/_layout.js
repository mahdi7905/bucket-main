import { useCallback } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AuthContextProvider from "../context/authContext";
import { View } from "react-native";
import { ThemeProvider } from "../context/darkModeContext";

SplashScreen.preventAutoHideAsync();

export default Layout = () => {
  const [fontsLoaded, fontError] = useFonts({
    interRegular: require("../assets/fonts/Inter-Regular.ttf"),
    interMedium: require("../assets/fonts/Inter-Medium.ttf"),
    interSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
    interBold: require("../assets/fonts/Inter-Bold.ttf"),
    interExtraBold: require("../assets/fonts/Inter-ExtraBold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 2000);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </AuthContextProvider>
    </ThemeProvider>
  );
};
