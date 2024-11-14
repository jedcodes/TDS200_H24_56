import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Post } from "@/types/type";
import CustomAvatar from "./CustomAvatar";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Image } from "expo-image";
import Icon from "@/assets/icons";
import { router } from "expo-router";

const PostFeedCard = ({
  hasShadow = true,
  post,
}: {
  hasShadow?: boolean;
  post: Post | null;
}) => {
  const customShadow = {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  };

  return (
    <View style={[styles.container, hasShadow && customShadow]}>
      {/** Header */}
      <View className="flex flex-row justify-between">
        <View className="gap-2 flex flex-row items-center">
          <CustomAvatar size="md" />
          <View className="gap-2 flex flex-col">
            <Text className="texr-lg font-interSemiBold">{post?.title}</Text>
            <Text>{post?.createdAt}</Text>
          </View>
        </View>
      </View>
      {/** Body */}
      <View className="gap-10">
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
            <Icon name="favourite" />
          </Pressable>
          <Text>{post?.likes.length}</Text>
        </View>
        <View className="flex flex-row items-center">
          <Pressable>
            <Icon name="chat" />
          </Pressable>
          <Text>{post?.comments.length}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: 15,
    borderCurve: "continuous",
    padding: 10,
    borderWidth: 0.8,
    shadowColor: "#000",
    backgroundColor: "#FCFCFC",
    paddingVertical: 12,
  },
  media: {
    height: heightPercentageToDP(40),
    width: "100%",
    borderRadius: 15,
    borderCurve: "continuous",
  },
});

export default PostFeedCard;
