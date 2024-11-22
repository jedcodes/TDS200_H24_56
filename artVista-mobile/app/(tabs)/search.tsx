import { View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenContainer from "@/components/ScreenContainer";
import CustomTextInput from "@/components/CustomTextInput";
import useSearchArtist from "@/hooks/useSearchArtist";
import useDebounce from "@/hooks/useDebounce";
import ArtistSearchCard from "@/components/ArtistSearchCard";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";

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
  const { isLoading, searchResults, searchArtist } = useSearchArtist();
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      searchArtist(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <ScreenContainer containerrStyle="px-4">
      <View className="flex-1 gap-10">
        <CustomTextInput
          placeholder="Search for artist"
          onChangeText={(text) => setSearch(text)}
        />

        <ArtistSearchCard artist={searchResults!} />
      </View>
    </ScreenContainer>
  );
};

export default search;
