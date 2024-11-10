import { View, Text, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { ArtWork } from "@/types/type";
import CustomAvatar from "./CustomAvatar";
import Icon from "@/assets/icons";
import { router } from "expo-router";

const ArtWordCard = ({ item }: { item?: ArtWork }) => {
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row items-center justify-between w-full">
        <View className="flex flex-row gap-2 items-center">
          <CustomAvatar size="medium" />
          <View className="flex justify-center ml-3 gap-y-1">
            <Text className="text-lg font-interBold text-primary-dark"></Text>
            <Text className="text-sm font-interRegular text-primary-dark">
              {item?.category}
            </Text>
          </View>
        </View>
        <Text className="text-neutral-200">5 hrs ago</Text>
      </View>
      <Pressable
        onPress={() => {
          router.push({
            pathname: "/(modal)/[id]",
            params: { id: item?.id! },
          });
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
          <Pressable className="flex flex-row items-center">
            <Icon name="favourite" color={"#21302F"} />
            <Text className="text-primary-dark">{item?.likes.length}</Text>
          </Pressable>
          <Pressable className="flex flex-row items-center">
            <Icon name="chat" color={"#21302F"} />
            <Text className="text-primary-dark">{item?.comments.length}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ArtWordCard;
