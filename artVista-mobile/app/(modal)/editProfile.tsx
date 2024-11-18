import { View, Text } from "react-native";
import React, { useEffect } from "react";
import ScrollContainer from "@/components/CustomScrollView";
import CustomBackButton from "@/components/CustomBackButton";
import { router } from "expo-router";
import CustomAvatar from "@/components/CustomAvatar";
import useFetchArtist from "@/hooks/useFetchArtist";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";
import useEditProfile from "@/hooks/useEditProfile";

const EditProfile = () => {
  const {} = useEditProfile();
  const { artist } = useFetchArtist();
  const [form, setForm] = React.useState({
    username: "",
    bio: "",
    location: "",
    phone: "",
  });

  useEffect(() => {
    if (artist) {
      setForm({
        username: artist?.username || "",
        bio: artist?.bio || "",
        location: artist?.location || "",
        phone: artist?.phone || "",
      });
    }
  }, [artist]);

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
          <CustomAvatar size="lg" imageUrl={artist?.photoURL} showIcon />
          <View className="gap-5 mt-5 w-full">
            <CustomTextInput value={form.username} />
            <CustomTextInput
              value={form.location}
              placeholder="Skriv adresse"
            />
            <CustomTextInput value={form.bio} placeholder="Skriv bio" />
            <CustomButton title="Update" />
          </View>
        </View>
      </View>
    </ScrollContainer>
  );
};

export default EditProfile;
