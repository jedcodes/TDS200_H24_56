import { View, Text, FlatList } from "react-native";
import React from "react";
import { SAMPLE_DATA } from "@/constants/DATA";
import ArtWordCard from "./ArtWordCard";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MasonryFlashList } from "@shopify/flash-list";

const ArtWorkGrid = () => {
  return (
    <View style={{ width: wp(100), minHeight: 3 }}>
      <FlatList
        data={SAMPLE_DATA}
        numColumns={2}
        renderItem={({ item }) => <ArtWordCard item={item} />}
      />
    </View>
  );
};

export default ArtWorkGrid;
