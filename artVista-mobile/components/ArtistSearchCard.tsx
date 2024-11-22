import { View, Text, Pressable } from "react-native";
import React from "react";
import { Artist } from "@/types/type";
import Loading from "./Loading";
import CustomAvatar from "./CustomAvatar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from "expo-router";

const ArtistSearchCard = ({ artist }: { artist: Artist }) => {
  const router = useRouter();
  if (!artist) return null;
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(modal)/[id]",
          params: { id: artist.id },
        })
      }
      className=" py-4 px-2 bg-secondary rounded-3xl"
    >
      <View className="flex-row w-full items-center justify-start gap-x-2">
        <CustomAvatar imageUrl={artist.photoURL} size="md" showIcon={false} />
        <Text
          style={{ fontSize: hp(2) }}
          className="font-interSemiBold text-white"
        >
          {artist.username}
        </Text>
      </View>
    </Pressable>
  );
};

export default ArtistSearchCard;
