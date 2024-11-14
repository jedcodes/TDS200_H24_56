import { View, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const getAvatarSize = (size: string) => {
  switch (size) {
    case "sm":
      return { width: hp(3), height: hp(3) };
    case "md":
      return { width: hp(4), height: hp(4) };
    case "lg":
      return { width: hp(6), height: hp(6) };
    default:
      return { width: hp(3), height: hp(3) };
  }
};

const CustomAvatar = ({
  size,
  imageUrl,
}: {
  size: string;
  imageUrl?: string;
}) => {
  return (
    <View style={getAvatarSize(size)} className=" rounded-lg">
      <Image
        source={require("@/assets/images/avatar.jpg")}
        className="w-full h-full rounded-full"
        resizeMode="cover"
      />
    </View>
  );
};

export default CustomAvatar;
