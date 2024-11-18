import { View, Text, Pressable, Alert, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import TextInputField from "@/components/CustomTextInput";
import CustomBackButton from "@/components/CustomBackButton";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/authContext";
import ScrollContainer from "@/components/CustomScrollView";
import Icon from "@/assets/icons";
import CustomButton from "@/components/CustomButton";
import "react-native-get-random-values";
import useFeedStore from "@/store/useFeedStore";
import useCreatePost from "@/hooks/useCreatePost";

const NewPostScreen = () => {
  const { isAuthenticated } = useAuth();

  // sjekker om brukeren er autentisert. hvos ikke, sendes brukeren tilbake til innloggingsiden. Deene effekten kjører hver gang isAuthenticated endres.
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/sign-in");
    }
  }, [isAuthenticated]);

  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const { handleCreatePost, isLoading } = useCreatePost();

  const {
    updateHashtags,
    updateCategory,
    updateDescription,
    updateTitle,
    imageUrl,
  } = useFeedStore();

  const uploadPost = async () => {
    await handleCreatePost();
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
              Fill all details in to add new artwork.
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
            onPress={() => uploadPost()}
          />
        </View>
      </View>
    </ScrollContainer>
  );
};

export default NewPostScreen;
