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
import useLikePost from "@/hooks/useLikePost";

const PostFeedCard = ({ post }: { post: Post }) => {
  const { artistProfile } = useGetArtistById(post?.artistId!);
  // const { isLiked, likePost, likes } = useLikePost(post);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const toggleLike = async () => {
    //   await likePost();
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
              pathname: "/(modal)/[id]",
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
      <View className="flex flex-row gap-15">
        <View className="flex flex-row items-center">
          <Pressable>
            <Icon name="favourite" color={"white"} fontSize={26} />
          </Pressable>
          <Text className="text-white">{post.likes.length}</Text>
        </View>
        <View className="flex flex-row items-center ml-2">
          <Pressable onPress={handlePresentModalPress}>
            <Icon name="chat" color={"white"} fontSize={26} />
          </Pressable>
          <Text className="text-white">{post?.comments.length}</Text>
        </View>
      </View>
      <CommentBottomSheet ref={bottomSheetModalRef} posts={post} />
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
