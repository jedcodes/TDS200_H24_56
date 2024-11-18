import { Pressable } from "react-native";
import React from "react";
import Icon from "@/assets/icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CustomBackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: hp(5), height: hp(5) }}
      className="rounded-2xl items-center flex justify-center border-gray-200 border-[2px]"
    >
      <Icon name="arrowBack" color={"#25C0B7"} />
    </Pressable>
  );
};

export default CustomBackButton;
