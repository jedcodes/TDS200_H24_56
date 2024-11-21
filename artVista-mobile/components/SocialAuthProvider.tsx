import { View, Text, Pressable } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useGoogleAuth from "@/hooks/useGoogleAuth";

const SocialAuthProvider = () => {
  const { handleGoogleAuth } = useGoogleAuth();
  const onHandleGoogleAuth = async () => {
    await handleGoogleAuth();
  };

  return (
    <View className="mt-5 flex-row w-full justify-center items-center gap-5">
      <Pressable
        onPress={onHandleGoogleAuth}
        style={{ width: hp(8), height: hp(8) }}
        className="rounded-full bg-secondary justify-center items-center"
      >
        <FontAwesome name="google" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default SocialAuthProvider;
