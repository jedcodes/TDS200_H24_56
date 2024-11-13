import { View, Text, Alert, StatusBar } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import TextInputField from "@/components/TextInputField";
import CustomButton from "@/components/CustomButton";
import CustomBackButton from "@/components/CustomBackButton";
import ScrollContainer from "@/components/ScrollContainer";
import useSignup from "@/hooks/useSignup";

const SignUpScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signup, error } = useSignup();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    setIsLoading(true);
    await signup(form.email, form.password, form.username);
    router.replace("/(tabs)/home");
    setIsLoading(false);
  };

  return (
    <ScrollContainer>
      <StatusBar barStyle="dark-content" />
      <CustomBackButton onPress={() => router.back()} />
      <View className="my-10">
        <Text
          style={{ fontSize: hp(4) }}
          className="font-interExtraBold tracking-wider"
        >
          ArtVista
        </Text>
        <Text className="font-interMedium text-2xl tracking-wider ">
          Sign up to ArtVista
        </Text>
      </View>
      <View>
        <TextInputField
          iconStyle="#25C0B7"
          label="Username"
          icon={"user"}
          placeholder="Enter your username"
          onChangeText={(text) => setForm({ ...form, username: text })}
        />
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
          title="Sign up"
          onPress={() => handleSignUp()}
          bgVariant="primary"
          className="mt-5"
        />
      </View>
      <View className="w-full flex flex-row justify-center items-center mb-5">
        <Link href="/(auth)/sign-in">
          Do you already have an account?
          <Text className="ml-2 text-secondary">Log in</Text>
        </Link>
      </View>
    </ScrollContainer>
  );
};

export default SignUpScreen;
