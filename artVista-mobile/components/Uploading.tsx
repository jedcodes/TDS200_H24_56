import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import React from "react";
import ProgressBar from "./ProgressBar";
import useArtWorkStore from "@/store/useArtWorkStore";
import { uploadImage } from "@/api/uploadArtWorkAPI";
import { ArtWork } from "@/types/type";

const Uploading = () => {
  const { progress, imageUrl, title, description, hashtags, category } =
    useArtWorkStore();

  const onUploadMedia = async () => {
    const newPost: ArtWork = {
      title,
      imageUrl,
      description,
      hashtags,
      category,
      comments: [],
      likes: [],
      author: "user",
      location: null,
    };
    await uploadImage(newPost);
  };

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        },
      ]}
    >
      <Image
        source={imageUrl}
        style={{ width: 100, height: 100, borderRadius: 6 }}
      />
      <Text className="text-white text-xl">Uploading ...</Text>
      <ProgressBar progress={progress} />
      <Pressable onPress={onUploadMedia} className="mt-5 bg-teal-300">
        <Text>Add media</Text>
      </Pressable>
    </View>
  );
};

export default Uploading;

//  <View
//    style={{ width: wp(70), marginTop: top }}
//    className="flex mx-auto justify-center items-center gap-y-4 bg-primary rounded-2xl my-3 py-4 px-3"
//  >
//    <Text className="text-neutral-100 text-lg">Add media file</Text>
//    <Pressable>
//      <Icon name="media" color={"#f9f9f9"} />
//    </Pressable>
//  </View>;
