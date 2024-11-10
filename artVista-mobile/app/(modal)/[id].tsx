import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getArtworkById } from "@/api/uploadArtWorkAPI";
import { ArtWork } from "@/types/type";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "@/context/authContext";
import Icon from "@/assets/icons";
import TextInputField from "@/components/TextInputField";

const ArtworkDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [artwork, setArtwork] = useState<ArtWork | null>(null);
  const { artist } = useAuth();

  useEffect(() => {
    const fetchArtwork = async () => {
      const result = await getArtworkById(id as string);
      setArtwork(result!);
    };
    fetchArtwork();
  }, []);

  return (
    <ScrollView style={{ paddingHorizontal: wp(2), paddingVertical: wp(7) }}>
      <View
        style={{ borderWidth: 0.8 }}
        className="flex flex-col items-center p-4  border-neutral-300 rounded-2xl"
      >
        <View className="flex flex-row w-full gap-x-2">
          <Image
            source={
              artist?.photoURL
                ? artist.photoURL
                : require("@/assets/images/avatar.jpg")
            }
            style={{ width: hp(5), height: hp(5), borderRadius: 20 }}
          />
          <View className="flex flex-col items-start my-2">
            <Text className="font-interSemiBold">username</Text>
            <Text className="text-neutral-500 font-interRegular tracking-wider">
              Location
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center w-full">
          <Text>{artwork?.description}</Text>
        </View>
        <Image
          source={artwork?.imageUrl}
          style={{
            width: wp(90),
            height: hp(40),
            borderRadius: 12,
          }}
        />
        <View className="flex flex-row w-full mt-2">
          <View className="flex flex-row gap-x-2 items-center">
            <View className="flex flex-row items-center">
              <Icon name="favourite" color={"#21302F"} />
              <Text className="text-primary-dark">{artwork?.likes.length}</Text>
            </View>
            <View className="flex flex-row items-center">
              <Icon name="chat" color={"#21302F"} />
              <Text className="text-primary-dark">
                {artwork?.comments.length}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row items-center ">
        <TextInputField placeholder="Type comment" />
      </View>
    </ScrollView>
  );
};

export default ArtworkDetailScreen;
