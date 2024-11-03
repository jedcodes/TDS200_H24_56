import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/authContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter_18pt-Thin": require("@/assets/fonts/Inter_18pt-Thin.ttf"),
    "Inter_18pt-Regular": require("@/assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter_18pt-Medium": require("@/assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter_18pt-SemiBold": require("@/assets/fonts/Inter_18pt-SemiBold.ttf"),
    "Inter_18pt-Bold": require("@/assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter_18pt-ExtraBold": require("@/assets/fonts/Inter_18pt-ExtraBold.ttf"),
  });

  const { initialized, session } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (!initialized) return;

    const inApp = segments[0] === "(tabs)";

    if (session && !inApp) {
      router.replace("/(tabs)/home");
    } else if (!session) {
      router.replace("/(auth)/sign-in");
    }
  }, [initialized, session]);

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
