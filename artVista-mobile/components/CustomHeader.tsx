import { View, Text, Pressable, Platform } from "react-native";
import React from "react";
import Icon from "@/assets/icons";
import CustomAvatar from "./CustomAvatar";
import useFetchArtist from "@/hooks/useFetchArtist";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CustomHeader = ({ title }: { title: string }) => {
  const { artist } = useFetchArtist();
  const { artist: user } = useAuth();
  const router = useRouter();
  const isPresented = router.canGoBack();

  return (
    <View className="w-full items-center justify-between flex-row">
      {artist?.id === user?.uid ? (
        <View className="flex-row justify-between flex-1">
          <Text className="font-interBold text-3xl tracking-widest text-secondary">
            {title}
          </Text>
          <View className="flex-row gap-2">
            <Pressable onPress={() => router.push("./(tabs)/profile")}>
              <CustomAvatar
                size="md"
                imageUrl={artist?.photoURL}
                showIcon={false}
              />
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable
          onPress={() => {
            Platform.OS === "web" ? isPresented : router.back();
          }}
        >
          <Icon name="close" color={"white"} fontSize={hp(3)} />
        </Pressable>
      )}
    </View>
  );
};

export default CustomHeader;
