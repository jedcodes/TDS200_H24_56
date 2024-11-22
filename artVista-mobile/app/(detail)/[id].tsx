import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useCallback, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import useFetchFeedById from "@/hooks/useFetchFeedById";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/Error/ErrorMessage";
import CustomBackButton from "@/components/CustomBackButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@/assets/icons";
import useGetArtistById from "@/hooks/useGetArtistById";
import CustomAvatar from "@/components/CustomAvatar";
import useToggleLikes from "@/hooks/useToggleLikes";
import { useAuth } from "@/context/authContext";
import CommentBottomSheet from "@/components/CommentBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const FeedDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { isLoading, post } = useFetchFeedById(id as string);
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { artistProfile } = useGetArtistById(post?.artistId!);
  const { togglePostLike } = useToggleLikes();
  const { artist } = useAuth();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  if (isLoading) return <Loading />;
  if (!post) return <ErrorMessage />;
  if (!artistProfile) return <Loading />;

  const handleToggleLikes = async () => {
    await togglePostLike(post.id!, artist?.uid!);
  };

  return (
    <View className="flex-1 bg-primary">
      {/* Background image */}
      <Image source={post?.imageUrl} style={styles.image} transition={100} />

      {/* Gradient overlay */}
      <LinearGradient
        style={styles.gradient}
        colors={[
          "rgba(12, 12, 12,0.2)",
          "rgba(12, 12, 12,0.2)",
          "rgba(12, 12, 12,0.4)",
          "rgba(12, 12, 12,0.6)",
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
      >
        {/* Top-left text and icon */}
        <View style={styles.topLeftCorner} className="">
          <CustomBackButton onPress={() => router.back()} />
        </View>
        <View
          style={{ marginBottom: top, marginHorizontal: 8 }}
          className="justify-end flex-1"
        >
          <View className="flex-row items-center justify-between">
            {/* Artist profile picture and name */}
            <View className="gap-5">
              <View className="flex-row items-center gap-x-2">
                <CustomAvatar
                  imageUrl={artistProfile.photoURL}
                  showIcon={false}
                  size="md"
                />
                <Text
                  style={{ fontSize: hp(2.4) }}
                  className="text-white font-interSemiBold"
                >
                  {artistProfile.username}
                </Text>
              </View>
              <Text
                style={{ fontSize: hp(2) }}
                className="text-white font-interRegular"
              >
                {post.description}
              </Text>
            </View>
            {/* Post Ikoner */}
            <View className="items-center gap-y-2">
              <Pressable onPress={handleToggleLikes}>
                <Icon
                  name="favourite"
                  fontSize={hp(4)}
                  fill={
                    post.likes.includes(artist?.uid!) ? "red" : "transparent"
                  }
                  color={post.likes.includes(artist?.uid!) ? "red" : "white"}
                />
              </Pressable>
              <Pressable onPress={handlePresentModalPress}>
                <Icon name="chat" fontSize={hp(4)} color={"white"} />
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/(modal)/mapView",
                    params: {
                      id: post.id,
                    },
                  })
                }
              >
                <Icon name="location" fontSize={hp(4)} color={"white"} />
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
      <CommentBottomSheet posts={post} ref={bottomSheetModalRef} />
    </View>
  );
};

export default FeedDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    position: "absolute", // Ensures image is the background
  },
  gradient: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    justifyContent: "space-between", // Space between top-left and bottom views
  },
  topLeftCorner: {
    position: "absolute",
    margin: 20,
  },
});
