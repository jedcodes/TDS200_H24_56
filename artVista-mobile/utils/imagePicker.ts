import { uploadImage } from "@/api/uploadArtWorkAPI";
import useArtWorkStore from "@/store/useArtWorkStore";
import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  const { updateImageUrl } = useArtWorkStore();
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
