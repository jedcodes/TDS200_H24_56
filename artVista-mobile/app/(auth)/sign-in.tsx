import { View, Text, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Link } from "expo-router";

import ScreenContainer from "@/components/ScreenContainer";
import TextInputField from "@/components/TextInputField";
import CustomButton from "@/components/CustomButton";
import CustomBackButton from "@/components/CustomBackButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const SignInScreen = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Email or password is empty");
    }
    await signInWithEmailAndPassword(auth, form.email, form.password);
  };

  return (
    <ScreenContainer bgColor="bg-primary-dark">
      <CustomBackButton />
      <View className="my-10">
        <Text
          style={{ fontSize: hp(4) }}
          className="font-interExtraBold tracking-wider text-white"
        >
          ArtVista
        </Text>
        <Text className="font-interMedium text-2xl tracking-wider text-neutral-200">
          Sign in to ArtVista
        </Text>
      </View>
      <View>
        <TextInputField
          iconStyle="#A3E635"
          label="Email"
          icon={"mail"}
          placeholder="Enter your email"
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <TextInputField
          iconStyle="#A3E635"
          label="Password"
          icon={"lock"}
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <CustomButton
          title="Sign up"
          onPress={() => handleSignIn()}
          bgVariant="secondary"
          className="mt-5"
        />
      </View>
      <View className="w-full flex flex-row justify-center items-center mb-5">
        <Link href="/(auth)/sign-in" className="text-white">
          Dont already have an account?
          <Text className="ml-2 text-secondary">Register</Text>
        </Link>
      </View>
    </ScreenContainer>
  );
};

export default SignInScreen;
