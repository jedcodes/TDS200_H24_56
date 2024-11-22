import { View, Text, Pressable, Platform, StatusBar } from "react-native";
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
import useCreatePost from "@/hooks/useCreatePost";
import usePickImage from "@/hooks/usePickImage";
import useImageStore from "@/store/useImageStore";

const NewPostScreen = () => {
  const { isAuthenticated } = useAuth();

  // sjekker om brukeren er autentisert. hvos ikke, sendes brukeren tilbake til innloggingsiden. Deene effekten kjører hver gang isAuthenticated endres.
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/sign-in");
    }
  }, [isAuthenticated]);

  const { pickImage } = usePickImage();
  const router = useRouter();
  const { imageUrl } = useImageStore();
  const { handleCreatePost, isLoading } = useCreatePost();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    hashtags: "",
  });

  // Denne funksjonen gjøre tre ting, laster opp et nytt innlegg, sender brukeren til hjemmesiden og resetter formen.
  const uploadPost = async () => {
    await handleCreatePost(
      form.title,
      form.description,
      form.category,
      form.hashtags
    );
    router.replace("/(tabs)/home");
    setForm({
      title: "",
      description: "",
      category: "",
      hashtags: "",
    });
  };

  return (
    <ScrollContainer>
      <StatusBar barStyle="light-content" />
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

        {/* Bilder Input  */}
        <View
          style={{ marginVertical: 10 }}
          className="flex items-center justify-center gap-5"
        >
          <View className="mt-5">
            {imageUrl ? (
              <Image
                source={imageUrl}
                style={{ width: 100, height: 100, borderRadius: 6 }}
              />
            ) : (
              <Text className="text-neutral-100">No Image Selected</Text>
            )}
          </View>
          <View className="flex-row w-full items-center justify-center gap-10">
            <Pressable
              onPress={() => pickImage()}
              className="p-4 rounded-xl gap-2 flex-row items-center justify-center bg-secondary"
            >
              <Icon name="media" color={"white"} />
              <Text className="text-white">Import</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(camera)/camera")}
              className="p-4 rounded-xl gap-2 flex-row items-center justify-center bg-secondary"
            >
              <Icon name="media" color={"white"} />
              <Text className="text-white">Take Pic</Text>
            </Pressable>
          </View>
        </View>

        {/* Input Felt  */}
        <View className="flex w-full gap-5">
          <TextInputField
            label="Title"
            placeholder="Enter image title"
            onChangeText={(text) => setForm({ ...form, title: text })}
            value={form.title}
          />
          <TextInputField
            label="Description"
            placeholder="Give your art an description"
            onChangeText={(text) => setForm({ ...form, description: text })}
            value={form.description}
          />
          <TextInputField
            label="Category"
            placeholder="Enter art piece category"
            onChangeText={(text) => setForm({ ...form, category: text })}
            value={form.category}
          />
          <TextInputField
            label="Hashtags"
            placeholder="Express your art by giving some hashtags"
            onChangeText={(text) => setForm({ ...form, hashtags: text })}
            value={form.hashtags}
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
