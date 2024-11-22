import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenContainer from "@/components/ScreenContainer";
import CustomTextInput from "@/components/CustomTextInput";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import useSearch from "@/hooks/useSearch";
import { FlashList } from "@shopify/flash-list";
import PostGridList from "@/components/PostGridList";

const search = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  // sjekker om brukeren er autentisert. hvos ikke, sendes brukeren tilbake til innloggingsiden. Deene effekten kjører hver gang isAuthenticated endres.
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/sign-in");
    }
  }, [isAuthenticated]);
  const [search, setSearch] = useState("");
  // const { isLoading, searchResults, searchArtist } = useSearchArtist();
  const debouncedSearch = useDebounce(search, 500);
  const { searchResults, searchPost } = useSearch();

  useEffect(() => {
    if (debouncedSearch) {
      searchPost(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <ScreenContainer containerrStyle="px-4">
      <View className="flex-1 gap-10">
        <CustomTextInput
          placeholder="Search post title, category"
          onChangeText={(text) => setSearch(text)}
        />

        <FlashList
          estimatedItemSize={200}
          data={searchResults}
          renderItem={({ item }) => (
            <PostGridList showDelete={false} post={item} />
          )}
        />
      </View>
    </ScreenContainer>
  );
};

export default search;
