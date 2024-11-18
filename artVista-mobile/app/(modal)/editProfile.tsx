import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import ScrollContainer from "@/components/CustomScrollView";
import CustomBackButton from "@/components/CustomBackButton";
import CustomAvatar from "@/components/CustomAvatar";
import useFetchArtist from "@/hooks/useFetchArtist";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";
import useEditProfile from "@/hooks/useEditProfile";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import usePickImage from "@/hooks/usePickImage";

const EditProfile = () => {
  const { editProfile } = useEditProfile();
  const { URL, pickImage } = usePickImage();
  const { artist } = useFetchArtist();
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    username: "",
    bio: "",
    location: "",
    phone: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (artist) {
      setForm({
        username: artist?.username || "",
        bio: artist?.bio || "",
        location: artist?.location || "",
        phone: artist?.phone || "",
        imageUrl: artist?.photoURL || URL!,
      });
    }
  }, [artist]);

  const handleUpdate = async () => {
    setIsLoading(true);
    await editProfile(form);
    setIsLoading(false);
    router.replace("/(tabs)/profile");
  };

  return (
    <ScrollContainer>
      <View className="flex-1">
        <View className="flex-row items-center w-full gap-x-5">
          <CustomBackButton onPress={() => router.back()} />
          <Text className="font-interBold text-2xl text-center">
            Edit Profile
          </Text>
        </View>
        <View className="flex-1 items-center">
          <CustomAvatar
            size="lg"
            imageUrl={artist?.photoURL || URL!}
            showIcon={false}
          />
          <View className="gap-5 mt-5 w-full">
            <Pressable
              onPress={pickImage}
              style={{ width: hp(8), height: hp(8) }}
              className="border-[2px] border-primary-dark rounded-xl justify-center items-center"
            >
              <Feather name="camera" size={24} color="black" />
            </Pressable>
            <CustomTextInput
              value={form.username}
              onChangeText={(text) => setForm({ ...form, username: text })}
            />
            <CustomTextInput
              value={form.location}
              placeholder="Skriv adresse"
              onChangeText={(text) => setForm({ ...form, location: text })}
            />
            <CustomTextInput
              value={form.location}
              placeholder="Skriv Telefonnummer"
              onChangeText={(text) => setForm({ ...form, location: text })}
            />
            <CustomTextInput
              value={form.bio}
              placeholder="Skriv bio"
              onChangeText={(text) => setForm({ ...form, bio: text })}
            />
            <CustomButton
              isLoading={isLoading}
              title="Update"
              onPress={() => handleUpdate()}
            />
          </View>
        </View>
      </View>
    </ScrollContainer>
  );
};

export default EditProfile;
