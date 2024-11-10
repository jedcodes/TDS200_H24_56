import { View, Text, Image, Pressable, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Link, useRouter } from "expo-router";

import ScreenContainer from "@/components/ScreenContainer";
import TextInputField from "@/components/TextInputField";
import CustomButton from "@/components/CustomButton";
import CustomBackButton from "@/components/CustomBackButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SignInScreen = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    setIsLoading(true);
    if (form.email === "" || form.password === "") {
      Alert.alert("Email or password is empty");
    }
    const respone = await signInWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );
    console.log(respone);
    router.replace("/(tabs)/home");
    setIsLoading(false);
  };

  return (
    <ScrollView
      style={{ paddingTop: top, paddingHorizontal: 6 }}
      className="flex-1 bg-primary"
    >
      <CustomBackButton onPress={() => router.back()} />
      <View className="my-10">
        <Text
          style={{ fontSize: hp(4) }}
          className="font-interExtraBold tracking-wider"
        >
          ArtVista
        </Text>
        <Text
          style={{ fontSize: hp(3) }}
          className="font-interSemiBold  tracking-wider "
        >
          Welcome Back
        </Text>
      </View>
      <View>
        <TextInputField
          iconStyle="#25C0B7"
          label="Email"
          icon={"mail"}
          placeholder="Enter your email"
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <TextInputField
          iconStyle="#25C0B7"
          label="Password"
          icon={"lock"}
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <CustomButton
          isLoading={isLoading}
          title="Login"
          onPress={() => handleSignIn()}
          bgVariant="primary"
          className="mt-5"
        />
      </View>
      <View className="w-full flex flex-row justify-center items-center mb-5">
        <Link href="/(auth)/sign-up">
          Dont already have an account?
          <Text className="ml-2 text-secondary">Register</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;
