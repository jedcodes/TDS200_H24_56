import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Post } from "@/types/type";
import { Image } from "expo-image";
import Icon from "@/assets/icons";
import useDeletePost from "@/hooks/useDeletePost";

const PostGridList = ({
  post,
  showDelete,
}: {
  post: Post;
  showDelete: boolean;
}) => {
  const { onDeletePost } = useDeletePost();

  if (!post) return null;

  const handleDelete = async () => {
    await onDeletePost(post.id!, post.artistId!);
  };
  return (
    <View style={styles.container} className="mt-5">
      <Image source={post.imageUrl} style={styles.image} transition={100} />
      {showDelete && (
        <Pressable onPress={handleDelete} style={styles.icon}>
          <Icon name="delete" color={"#FF204E"} />
        </Pressable>
      )}
    </View>
  );
};

export default PostGridList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
  image: {
    width: "100%",
    height: Math.floor(Math.random() * 300) + 100,
    borderRadius: 8,
    borderCurve: "continuous",
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#0C0C0C",
    borderRadius: 20,
    padding: 5,
  },
});
