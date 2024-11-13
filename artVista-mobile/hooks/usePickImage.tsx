import useFeedStore from "@/store/useFeedStore";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const usePickImage = () => {
  const updateImageUrl = useFeedStore((state) => state.updateImageUrl);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      updateImageUrl(result.assets[0].uri);
    }
  };

  return { pickImage };
};

export default usePickImage;
