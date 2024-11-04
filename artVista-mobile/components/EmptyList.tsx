import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";

const EmptyList = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <View className="justify-center items-center">
      <Text className="font-interRegular text-neutral-100">{title}</Text>
      <CustomButton
        title="Back to Explore"
        onPress={() => router.push("/(tabs)/home")}
      />
    </View>
  );
};

export default EmptyList;
