import { View, Text } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "@/components/ScreenContainer";
import { FlashList } from "@shopify/flash-list";
import CustomTextInput from "@/components/CustomTextInput";
import useSearchArtist from "@/hooks/useSearchArtist";

const search = () => {
  const [search, setSearch] = useState();
  const { isLoading, searchResults, searchArtist } = useSearchArtist();
  return (
    <ScreenContainer>
      <View className="flex-1 gap-10">
        <CustomTextInput placeholder="Search for artist" />

        <Text>Search Results</Text>
      </View>
    </ScreenContainer>
  );
};

export default search;
