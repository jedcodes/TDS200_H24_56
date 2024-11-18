import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from "expo-image";
import Icon from "@/assets/icons";
import { router } from "expo-router";

const getAvatarSize = (size: string) => {
  switch (size) {
    case "sm":
      return { width: hp(3), height: hp(3) };
    case "md":
      return { width: hp(4), height: hp(4) };
    case "lg":
      return { width: hp(14), height: hp(14) };
    default:
      return { width: hp(3), height: hp(3) };
  }
};

const CustomAvatar = ({
  size,
  imageUrl,
  showIcon = false,
}: {
  size: string;
  imageUrl?: string;
  showIcon: boolean;
}) => {
  const avatarSize = getAvatarSize(size);

  return (
    <View
      style={{
        ...avatarSize,
        position: "relative", // // Ensures the image and icon don't spill outside the parent
      }}
      className="rounded-full bg-red-500"
    >
      <Image
        source={
          imageUrl && imageUrl !== ""
            ? { uri: imageUrl }
            : require("@/assets/images/avatar.jpg")
        }
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
        }}
        contentFit="cover"
      />
      {showIcon && (
        <Pressable
          style={styles.iconContainer}
          onPress={() => {
            router.push("/(modal)/editProfile");
          }}
        >
          <Icon name="edit" color="white" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    bottom: hp(0.5),
    right: hp(-1.5),
    backgroundColor: "#25C0B7",
    borderRadius: 12,
    padding: hp(0.5),
  },
});

export default CustomAvatar;
