import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenContainer from "@/components/ScreenContainer";
import Icon from "@/assets/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAuth } from "@/context/authContext";
import { getArtistData } from "@/api/artistAPI";
import { Artist } from "@/types/type";
import { router } from "expo-router";

const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const { signOut, artist } = useAuth();
  const [artistData, setArtistData] = useState<Artist | null>(null);

  const fetchArtist = async () => {
    const response = await getArtistData(artist?.uid as string);
    setArtistData(response!);
  };

  useEffect(() => {
    fetchArtist();
  }, []);

  return (
    <View className="bg-primary flex-1">
      <View
        style={{ paddingTop: top, height: hp(40) }}
        className="bg-primary-dark rounded-b-3xl px-4"
      >
        <View className="w-full items-center justify-between flex-row">
          <Text className="font-interBold text-2xl text-neutral-100">
            Profile
          </Text>
          <View className="flex-row gap-2">
            <Pressable onPress={signOut}>
              <Icon name="logout" color={"red"} />
            </Pressable>
          </View>
        </View>

        <View className="flex-1 mt-10 w-full">
          <View className="flex-1 gap-y-4 w-full items-center justify-center ">
            <View
              style={{ width: hp(12), height: hp(12) }}
              className=" bg-secondary rounded-full "
            >
              <Pressable onPress={() => router.push("/(modal)/editProfile")}>
                <Icon name="edit" color={"white"} />
              </Pressable>
            </View>
            <Text className="text-white font-interSemiBold text-2xl tracking-wider">
              {artistData?.username?.toUpperCase()}
            </Text>
          </View>
        </View>
        <View className="flex-1 w-full items-center justify-center flex-row gap-3">
          <View className="p-4 items-center ">
            <Text className="text-xl font-interMedium text-neutral-100">
              {artistData?.followers?.length}
            </Text>
            <Text className="text-xl font-interMedium text-neutral-500">
              Followers
            </Text>
          </View>
          <View className="p-4 items-center ">
            <Text className="text-xl font-interMedium text-neutral-100">
              {artistData?.favorites?.length}
            </Text>
            <Text className="text-xl font-interMedium text-neutral-500">
              Favourites
            </Text>
          </View>
          <View className="p-4 items-center ">
            <Text className="text-xl font-interMedium text-neutral-100">
              100
            </Text>
            <Text className="text-xl font-interMedium text-neutral-500">
              Art Works
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
