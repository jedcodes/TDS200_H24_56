import { View, Text } from "react-native";
import React, { useEffect } from "react";
import ScreenContainer from "@/components/ScreenContainer";
import { FlashList } from "@shopify/flash-list";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import PostGridList from "@/components/PostGridList";

const SavedScreen = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  // sjekker om brukeren er autentisert. hvos ikke, sendes brukeren tilbake til innloggingsiden. Deene effekten kjører hver gang isAuthenticated endres.
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/sign-in");
    }
  }, [isAuthenticated]);
  const data: [] = [];
  return (
    <ScreenContainer bgColor="bg-primary">
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <PostGridList showDelete={false} post={item} />
        )}
        estimatedItemSize={200}
      />
    </ScreenContainer>
  );
};

export default SavedScreen;
