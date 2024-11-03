import { View, Text, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "@/components/ScreenContainer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TextInputField from "@/components/TextInputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import CustomBackButton from "@/components/CustomBackButton";
import { supabase } from "@/lib/supabase";

const SignUpScreen = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    if (form.email === "" || form.password === "" || form.username === "") {
      Alert.alert("Username, email or password is empty");
    }
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.username,
        },
      },
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");

    console.log(session);
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
          Sign up to ArtVista
        </Text>
      </View>
      <View>
        <TextInputField
          iconStyle="#A3E635"
          label="Username"
          icon={"user"}
          placeholder="Enter your username"
          onChangeText={(text) => setForm({ ...form, username: text })}
        />
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
          onPress={() => handleSignUp()}
          bgVariant="secondary"
          className="mt-5"
        />
      </View>
      <View className="w-full flex flex-row justify-center items-center mb-5">
        <Link href="/(auth)/sign-in" className="text-white">
          Do you already have an account?
          <Text className="ml-2 text-secondary">Log in</Text>
        </Link>
      </View>
    </ScreenContainer>
  );
};

export default SignUpScreen;
