import { View, Text, Pressable } from "react-native";
import React from "react";
import Icon from "@/assets/icons";

const CustomHeader = ({
  title,
  iconOneName,
  iconTwoName,
}: {
  title: string;
  iconOneName: any;
  iconTwoName: any;
}) => {
  return (
    <View className="w-full items-center justify-between flex-row">
      <Text className="font-interBold text-3xl tracking-widest text-neutral-100">
        {title}
      </Text>
      <View className="flex-row gap-2">
        <Pressable>
          <Icon name={iconOneName} color={"#A3E635"} />
        </Pressable>
        <Pressable>
          <Icon name={iconTwoName} color={"#A3E635"} />
        </Pressable>
      </View>
    </View>
  );
};

export default CustomHeader;
