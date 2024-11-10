import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";

const EmptyList = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <View className="justify-center items-center flex-1">
      <Image
        className="w-[270px] h-[216px]"
        resizeMode="contain"
        source={require("@/assets/images/empty.png")}
      />
      <Text className="font-interRegular text-xl ">{title}</Text>
    </View>
  );
};

export default EmptyList;
