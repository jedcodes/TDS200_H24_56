import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { useEffect } from "react";
import { AuthProvider } from "@/context/authContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [fontsLoaded] = useFonts({
    "Inter_18pt-Thin": require("@/assets/fonts/Inter_18pt-Thin.ttf"),
    "Inter_18pt-Regular": require("@/assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter_18pt-Medium": require("@/assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter_18pt-SemiBold": require("@/assets/fonts/Inter_18pt-SemiBold.ttf"),
    "Inter_18pt-Bold": require("@/assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter_18pt-ExtraBold": require("@/assets/fonts/Inter_18pt-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(camera)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}

const RootLayout = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <InitialLayout />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default RootLayout;
