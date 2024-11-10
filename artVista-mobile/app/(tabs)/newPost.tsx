import { View, Text, Pressable, Alert, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import TextInputField from "@/components/TextInputField";
import CustomBackButton from "@/components/CustomBackButton";
import { useRouter } from "expo-router";
import useArtWorkStore from "@/store/useArtWorkStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/authContext";
import ScrollContainer from "@/components/ScrollContainer";
import Icon from "@/assets/icons";
import pickImage from "@/utils/imagePicker";
import CustomButton from "@/components/CustomButton";
import { uploadArtwork } from "@/api/uploadArtWorkAPI";
import { ArtWork } from "@/types/type";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const NewPostScreen = () => {
  const { isAuthenticated, artist } = useAuth();

  // sjekker om brukeren er autentisert. hvos ikke, sendes brukeren tilbake til innloggingsiden. Deene effekten kjører hver gang isAuthenticated endres.
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/sign-in");
    }
  }, [isAuthenticated]);

  const { top } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    updateHashtags,
    updateCategory,
    updateDescription,
    updateTitle,
    title,
    description,
    category,
    hashtags,
    imageUrl,
  } = useArtWorkStore();

  const onUploadArtwork = async () => {
    setIsLoading(true);
    const artwork: ArtWork = {
      id: uuidv4(),
      title,
      description,
      category,
      hashtags,
      imageUrl,
      artistId: artist?.uid!,
      likes: [],
      comments: [],
      location: null,
      createAt: new Date(),
    };
    await uploadArtwork(artwork);
    setIsLoading(false);
    router.replace("/(tabs)/home");
  };

  return (
    <ScrollContainer>
      <StatusBar barStyle="dark-content" />
      <View className=" flex flex-1">
        <View className="flex flex-row items-center gap-x-4">
          <CustomBackButton onPress={() => router.back()} />
          <View className="flex-col gap-y-2 items-start">
            <Text className="text-primary-dark font-interSemiBold text-2xl">
              Publish new Art Work
            </Text>
            <Text className="text-neutral-500">
              Fill all destails in to add new artwork.
            </Text>
          </View>
        </View>

        <View
          style={{ marginVertical: top / 2 }}
          className="flex flex-row w-full gap-x-2"
        >
          {imageUrl && (
            <Image
              source={imageUrl}
              style={{ width: 100, height: 100, borderRadius: 6 }}
            />
          )}
          <Pressable
            onPress={() => router.push("/(camera)/camera")}
            className="p-6 rounded-xl border h-[90px] w-[90px] items-center justify-center"
          >
            <Icon name="media" />
          </Pressable>
        </View>

        <View className="flex w-full">
          <TextInputField
            label="Title"
            placeholder="Enter image title"
            onChangeText={(text) => updateTitle(text)}
          />
          <TextInputField
            label="Description"
            placeholder="Give your art an description"
            onChangeText={(text) => updateDescription(text)}
          />
          <TextInputField
            label="Category"
            placeholder="Enter art piece category"
            onChangeText={(text) => updateCategory(text)}
          />
          <TextInputField
            label="Hashtags"
            placeholder="Express your art by giving some hashtags"
            onChangeText={(text) => updateHashtags(text)}
          />
          <CustomButton
            title="Add New Artwork"
            isLoading={isLoading}
            onPress={() => onUploadArtwork()}
          />
        </View>
      </View>
    </ScrollContainer>
  );
};

export default NewPostScreen;
