import { View, Text, Pressable } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@/assets/icons";
import { router } from "expo-router";
import useFetchArtist from "@/hooks/useFetchArtist";
import { useAuth } from "@/context/authContext";
import { Toast } from "toastify-react-native";
import CustomAvatar from "./CustomAvatar";

const ProfileHeader = () => {
  const { artist } = useFetchArtist();
  const { signout } = useAuth();
  const { top } = useSafeAreaInsets();

  const handleSignOut = () => {
    signout();
    Toast.success("Logged out successfully");
    router.replace("/(tabs)/home");
  };
  return (
    <View
      style={{ paddingTop: top, height: hp(40) }}
      className="bg-primary-dark rounded-b-3xl px-4"
    >
      <View className="w-full items-center justify-between flex-row">
        <Text className="font-interBold text-2xl text-neutral-100">
          Profile
        </Text>
        <View className="flex-row gap-2">
          <Pressable onPress={handleSignOut}>
            <Icon name="logout" color={"red"} />
          </Pressable>
        </View>
      </View>

      <View className="flex-1 mt-10 w-full">
        <View className="flex-1 gap-y-4 w-full items-center justify-center ">
          <CustomAvatar size="lg" showIcon />
          <Text className="text-white font-interSemiBold text-2xl tracking-wider">
            {artist?.username?.toUpperCase()}
          </Text>
        </View>
      </View>
      <View className="flex-1 w-full items-center justify-center flex-row gap-3">
        <View className="p-4 items-center ">
          <Text className="text-xl font-interMedium text-neutral-100">
            {artist?.followers?.length}
          </Text>
          <Text className="text-xl font-interMedium text-neutral-500">
            Followers
          </Text>
        </View>
        <View className="p-4 items-center ">
          <Text className="text-xl font-interMedium text-neutral-100">
            {artist?.favorites?.length}
          </Text>
          <Text className="text-xl font-interMedium text-neutral-500">
            Favourites
          </Text>
        </View>
        <View className="p-4 items-center ">
          <Text className="text-xl font-interMedium text-neutral-100">
            {artist?.posts?.length}
          </Text>
          <Text className="text-xl font-interMedium text-neutral-500">
            Art Works
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
