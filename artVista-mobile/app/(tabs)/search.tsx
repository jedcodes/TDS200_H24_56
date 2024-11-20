import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenContainer from "@/components/ScreenContainer";
import { FlashList } from "@shopify/flash-list";
import CustomTextInput from "@/components/CustomTextInput";
import useSearchArtist from "@/hooks/useSearchArtist";
import useDebounce from "@/hooks/useDebounce";

const search = () => {
  const [search, setSearch] = useState("");
  const { isLoading, searchResults, searchArtist } = useSearchArtist();
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      searchArtist(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <ScreenContainer>
      <View className="flex-1 gap-10">
        <CustomTextInput
          placeholder="Search for artist"
          onChangeText={(text) => setSearch(text)}
        />

        <Text>{searchResults?.username}</Text>
      </View>
    </ScreenContainer>
  );
};

export default search;
