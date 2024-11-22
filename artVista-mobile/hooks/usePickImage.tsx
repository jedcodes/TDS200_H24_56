import useImageStore from "@/store/useImageStore";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const usePickImage = () => {
  const { updateImageUrl } = useImageStore();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
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
