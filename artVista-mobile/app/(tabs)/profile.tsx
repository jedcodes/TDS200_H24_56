import { View, Text, Pressable } from "react-native";
import React from "react";
import ScreenContainer from "@/components/ScreenContainer";
import Icon from "@/assets/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View className="bg-primary-dark flex-1">
      <View
        style={{ paddingTop: top, height: hp(40) }}
        className="bg-primary rounded-b-3xl px-4"
      >
        <View className="w-full items-center justify-between flex-row">
          <Text className="font-interBold text-2xl text-neutral-100">
            Profile
          </Text>
          <View className="flex-row gap-2">
            <Pressable>
              <Icon name="favourite" color={"#A3E635"} />
            </Pressable>
            <Pressable>
              <Icon name="add" color={"#A3E635"} />
            </Pressable>
          </View>
        </View>

        <View className="flex-1 mt-10 w-full">
          <View className="flex-1 flex-row w-full items-center justify-center">
            <View
              style={{ width: hp(12), height: hp(12) }}
              className=" bg-secondary rounded-full"
            ></View>
          </View>
        </View>
        <View className="flex-1 w-full items-center justify-center flex-row gap-3">
          <View className="p-4 items-center ">
            <Text className="text-xl font-interMedium text-neutral-100">
              100
            </Text>
            <Text className="text-xl font-interMedium text-neutral-500">
              Favourites
            </Text>
          </View>
          <View></View>
          <View></View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
