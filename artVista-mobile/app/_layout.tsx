import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/authContext";

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

  // const { isAuthenticated } = useAuth();
  // const segments = useSegments();
  // const router = useRouter();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // useEffect(() => {
  //   if (!isAuthenticated) return;

  //   const inApp = segments[0] === "(tabs)";

  //   if (isAuthenticated && !inApp) {
  //     router.replace("/(tabs)/home");
  //   } else if (!isAuthenticated) {
  //     router.replace("/(auth)/sign-in");
  //   }
  // }, [isAuthenticated]);

  return <Slot />;
}

const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
