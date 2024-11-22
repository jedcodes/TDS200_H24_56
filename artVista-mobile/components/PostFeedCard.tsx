import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useCallback, useRef } from "react";
import { Post } from "@/types/type";
import CustomAvatar from "./CustomAvatar";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Image } from "expo-image";
import Icon from "@/assets/icons";
import { router } from "expo-router";
import useGetArtistById from "@/hooks/useGetArtistById";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CommentBottomSheet from "./CommentBottomSheet";
import useToggleLikes from "@/hooks/useToggleLikes";
import ErrorMessage from "./Error/ErrorMessage";
import { useAuth } from "@/context/authContext";

const PostFeedCard = ({ post }: { post: Post }) => {
  // Hvis post ikke eksisterer, vis feilmelding
  if (!post) {
    return <ErrorMessage />;
  }

  const { artistProfile } = useGetArtistById(post?.artistId!);
  const { togglePostLike } = useToggleLikes();
  const { artist } = useAuth();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleToggleLikes = async () => {
    await togglePostLike(post.id!, artist?.uid!);
  };

  return (
    <View style={[styles.container]}>
      {/** Header */}
      <View className="flex flex-row justify-between">
        <View className="gap-2 flex flex-row items-center">
          <CustomAvatar
            size="sm"
            showIcon={false}
            imageUrl={artistProfile?.photoURL}
          />
          <View className="gap-2 flex flex-col">
            <Pressable>
              <Text className="text-white text-2xl font-interSemiBold">
                {artistProfile?.username}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/** Body */}
      <View className="gap-2">
        <View className="ml-5">
          <Text className="font-interRegular">{post?.description}</Text>
        </View>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/(detail)/[id]",
              params: { id: post?.id! },
            })
          }
        >
          <Image
            source={post?.imageUrl}
            transition={100}
            style={styles.media}
            contentFit="cover"
          />
        </Pressable>
      </View>
      {/** Footer */}
      <View className="flex flex-row gap-15 mt-4">
        <View className="flex flex-row items-center">
          <Pressable onPress={handleToggleLikes}>
            <Icon
              name="favourite"
              fill={post.likes.includes(artist?.uid!) ? "red" : "transparent"}
              color={post.likes.includes(artist?.uid!) ? "red" : "white"}
              fontSize={28}
            />
          </Pressable>
          <Text className="text-white text-lg">{post.likes.length}</Text>
        </View>
        <View className="flex flex-row items-center ml-2">
          <Pressable onPress={handlePresentModalPress}>
            <Icon name="chat" color={"white"} fontSize={28} />
          </Pressable>
          <Text className="text-white text-lg">{post?.comments?.length}</Text>
        </View>
      </View>
      <CommentBottomSheet ref={bottomSheetModalRef} posts={post!} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  media: {
    height: heightPercentageToDP(50),
    width: "100%",
    borderCurve: "continuous",
  },
});

export default PostFeedCard;
