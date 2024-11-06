import { Pressable } from "react-native";
import React from "react";
import Icon from "@/assets/icons";
import { router } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CustomBackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: hp(5), height: hp(5) }}
      className="rounded-2xl items-center flex border justify-center border-secondary"
    >
      <Icon name="arrowBack" color={"white"} />
    </Pressable>
  );
};

export default CustomBackButton;
