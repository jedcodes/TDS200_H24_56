import { View, Text, StatusBar } from "react-native";
import React, { useRef, useState } from "react";
import { Link, useRouter } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import CustomButton from "@/components/CustomButton";
import useSignup from "@/hooks/useSignup";
import CustomTextInput from "@/components/CustomTextInput";
import CustomScrollView from "@/components/CustomScrollView";
import ToastManager, { Toast } from "toastify-react-native";

const SignUpScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signup } = useSignup();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSignUp = async () => {
    if (!form.email || !form.password || !form.username) {
      Toast.error("Vennligst fyll ut alle feltene");
      return;
    }

    try {
      setIsLoading(true);
      await signup(form.email, form.password, form.username);
      router.replace("/(tabs)/home");
    } catch (error) {
      Toast.error("Det har oppstått en feil. Vennligst prøv igjen senere");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomScrollView>
      <ToastManager />
      <StatusBar barStyle="dark-content" />
      <View className="my-10">
        <Text
          style={{ fontSize: hp(4) }}
          className="font-interExtraBold tracking-wider text-secondary"
        >
          ArtVista
        </Text>
        <Text className="font-interMedium text-lg text-primary-dark tracking-wider ">
          Sign up and explore the world of art
        </Text>
      </View>
      <View className="gap-10">
        <CustomTextInput
          label="Username"
          icon={"user"}
          placeholder="Enter your username"
          onChangeText={(text) => setForm({ ...form, username: text })}
        />
        <CustomTextInput
          label="Email"
          icon={"mail"}
          placeholder="Enter your email"
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <CustomTextInput
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
        <Link href="/(auth)/sign-in" className="text-white">
          Har du en bruker fra før?
          <Text className="ml-2 text-secondary">Log inn</Text>
        </Link>
      </View>
    </CustomScrollView>
  );
};

export default SignUpScreen;
