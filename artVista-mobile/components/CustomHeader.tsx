import { View, Text, Pressable } from "react-native";
import React from "react";
import Icon from "@/assets/icons";
import CustomAvatar from "./CustomAvatar";
import useFetchArtist from "@/hooks/useFetchArtist";
import { router } from "expo-router";

const CustomHeader = ({ title }: { title: string }) => {
  const { artist } = useFetchArtist();
  return (
    <View className="w-full items-center justify-between flex-row">
      <Text className="font-interBold text-3xl tracking-widest text-secondary">
        {title}
      </Text>
      <View className="flex-row gap-2">
        <Pressable onPress={() => router.push("./(tabs)/profile")}>
          <CustomAvatar
            size="md"
            imageUrl={artist?.photoURL}
            showIcon={false}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default CustomHeader;
