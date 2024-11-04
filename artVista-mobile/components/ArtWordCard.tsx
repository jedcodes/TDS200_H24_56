import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { ArtWork } from "@/types/type";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ArtWordCard = ({ item }: { item?: ArtWork }) => {
  return (
    <View className="flex items-center mb-14 ">
      {/** Card Header */}
      <View className="flex-row w-full items-center mb-2 justify-between">
        <View className="flex-row gap-2 items-center">
          <View
            style={{ width: hp(3.5), height: hp(3.5) }}
            className="rounded-full bg-purple-400"
          />
          <Pressable
            onPress={() => {
              console.log(item?.author);
            }}
          >
            <Text className="text-neutral-100 font-interBold">
              {item?.author}
            </Text>
          </Pressable>
        </View>
        <Text className="text-neutral-400">2 hrs ago</Text>
      </View>
      {/** Card Image */}
      <Image
        className="rounded-2xl"
        source={item?.imageUrl}
        style={{ width: wp(100), height: hp(30) }}
      />
      <View className="flex-row items-center mt-2 justify-between">
        <View className="flex-row gap-2"></View>
      </View>
    </View>
  );
};

export default ArtWordCard;
