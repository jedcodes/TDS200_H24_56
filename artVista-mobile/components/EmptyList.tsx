import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const EmptyList = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <View className="justify-center items-center flex-1">
      <Image
        className="w-[270px] h-[216px]"
        resizeMode="contain"
        source={require("@/assets/images/empty.png")}
      />
      <Text
        style={{ fontSize: hp(2.6) }}
        className="font-interRegular text-white"
      >
        {title}
      </Text>
    </View>
  );
};

export default EmptyList;
