import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from "expo-image";
import Icon from "@/assets/icons";
import { router } from "expo-router";

const getAvatarSize = (size: string) => {
  switch (size) {
    case "sm":
      return { width: hp(4), height: hp(4) };
    case "md":
      return { width: hp(6), height: hp(6) };
    case "lg":
      return { width: hp(14), height: hp(14) };
    default:
      return;
  }
};

const CustomAvatar = ({
  size,
  imageUrl,
  showIcon,
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
      className="rounded-full "
    >
      <Image
        source={
          imageUrl && imageUrl !== ""
            ? { uri: imageUrl }
            : require("@/assets/images/defaultUser.png")
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
          <Icon name="edit" color="#FF204E" />
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
    backgroundColor: "#0C0C0C",
    borderRadius: 12,
    padding: hp(0.5),
  },
});

export default CustomAvatar;
