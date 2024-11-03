import { View, Text, StatusBar } from "react-native";
import React from "react";
import ScreenContainer from "@/components/ScreenContainer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TextInputField from "@/components/TextInputField";
import ArtWorkGrid from "@/components/ArtWorkGrid";

const HomeScreen = () => {
  return (
    <ScreenContainer bgColor="bg-primary-dark">
      <StatusBar barStyle={"light-content"} />
      <View className="flex w-full flex-row items-center justify-between">
        <Text className="font-interBold text-2xl text-secondary">ArtVista</Text>
        <View
          style={{ width: hp(5), height: hp(5) }}
          className="rounded-full bg-secondary"
        ></View>
      </View>
      <TextInputField
        icon={"search"}
        iconStyle="#A3E635"
        placeholder="Search for artists ..."
      />
      <View className="mt-10">
        <ArtWorkGrid />
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;
