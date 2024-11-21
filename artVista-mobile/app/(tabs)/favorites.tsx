import { View, Text } from "react-native";
import React from "react";
import ScreenContainer from "@/components/ScreenContainer";
import { FlashList } from "@shopify/flash-list";

const SavedScreen = () => {
  const data: [] = [];
  return (
    <ScreenContainer bgColor="bg-primary">
      <FlashList
        ListHeaderComponent={() => <View className=""></View>}
        data={data}
        renderItem={(item) => <Text>Hello</Text>}
        estimatedItemSize={200}
      />
    </ScreenContainer>
  );
};

export default SavedScreen;
