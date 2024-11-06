import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import Icon from "@/assets/icons";
import ScreenContainer from "@/components/ScreenContainer";
import TextInputField from "@/components/TextInputField";
import CustomButton from "@/components/CustomButton";
import CustomBackButton from "@/components/CustomBackButton";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import useArtWorkStore from "@/store/useArtWorkStore";

const NewPostScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const {
    updateHashtags,
    updateCategory,
    updateDescription,
    updateImageUrl,
    imageUrl,
  } = useArtWorkStore();
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      updateImageUrl(image);
    }
  };

  return (
    <ScreenContainer bgColor="bg-primary-dark">
      <View className="relativ flex flex-1">
        <View className="flex flex-row items-center gap-x-4">
          <CustomBackButton onPress={() => router.back()} />
          <Text className="text-neutral-100 font-interSemiBold text-2xl">
            Publish new Art Work
          </Text>
        </View>
        <View className="flex flex-row w-full items-center justify-between bg-primary rounded-2xl my-3 py-4 px-3">
          <Text className="text-neutral-100 text-lg">Add media file</Text>
          <Pressable onPress={pickImage}>
            <Icon name="media" color={"#f9f9f9"} />
          </Pressable>
        </View>
        <View className="flex w-full">
          <TextInputField
            placeholder="Give your art an description"
            onChangeText={(text) => updateDescription(text)}
          />
          <TextInputField
            placeholder="Enter art piece category"
            onChangeText={(text) => updateCategory(text)}
          />
          <TextInputField
            placeholder="Express your art by giving some hashtags"
            onChangeText={(text) => updateHashtags(text)}
          />
        </View>
        <View className="bottom-0 absolute w-full">
          <CustomButton title="Publish" bgVariant="secondary" />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default NewPostScreen;
