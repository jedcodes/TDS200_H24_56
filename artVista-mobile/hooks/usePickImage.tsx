import useFeedStore from "@/store/useFeedStore";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const usePickImage = () => {
  const updateImageUrl = useFeedStore((state) => state.updateImageUrl);
  const [URL, setURL] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      updateImageUrl(result.assets[0].uri);
      setURL(result.assets[0].uri);
    }
  };

  return { pickImage, URL };
};

export default usePickImage;
