import { View, Text, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { ArtWork } from "@/types/type";
import CustomAvatar from "./CustomAvatar";
import Icon from "@/assets/icons";

const ArtWordCard = ({ item }: { item?: ArtWork }) => {
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row items-center justify-between w-full">
        <View className="flex flex-row gap-2 items-center">
          <CustomAvatar size="medium" />
          <View className="flex justify-center ml-3 gap-y-1">
            <Text className="text-lg font-interBold text-gray-100">
              {item?.author}
            </Text>
            <Text className="text-sm font-interRegular text-gray-200">
              {item?.category}
            </Text>
          </View>
        </View>
        <Text className="text-neutral-200">5 hrs ago</Text>
      </View>
      <Pressable
        onPress={() => {
          console.log(item?.id);
        }}
        className="w-full h-60 rounded-xl my-3"
      >
        <Image
          style={{ width: "100%", height: "100%", borderRadius: 12 }}
          source={item?.imageUrl}
        />
      </Pressable>
      <View className="flex flex-row items-center justify-between w-full">
        <View className="flex flex-row gap-x-2 items-center">
          <View className="flex flex-row items-center">
            <Icon name="favourite" color={"#f5f5f5"} />
            <Text className="text-neutral-100">10</Text>
          </View>
          <View className="flex flex-row items-center">
            <Icon name="chat" color={"white"} />
            <Text className="text-neutral-100">10</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ArtWordCard;
