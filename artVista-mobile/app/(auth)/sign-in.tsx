import { View, Text, StatusBar, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Link, useRouter } from "expo-router";
import ToastManager, { Toast } from "toastify-react-native";

import TextInputField from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import CustomScrollView from "@/components/CustomScrollView";
import SocialAuthProvider from "@/components/SocialAuthProvider";

const SignInScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      Toast.error("Fyll inn alle feltene");
    }

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.replace("/(tabs)/home");
    } catch (error) {
      ToastManager.error("Feil brukernavn eller passord");
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
        <Text
          style={{ fontSize: hp(3) }}
          className="font-interSemiBold tracking-wider text-white"
        >
          Welcome Back
        </Text>
      </View>
      <View className="gap-10">
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
        <View className="flex-row justify-end flex-1">
          <Link href="/(auth)/forgot-password">
            <Text className="text-secondary">Forgot Password?</Text>
          </Link>
        </View>
      </View>
      <CustomButton
        isLoading={isLoading}
        title="Login"
        onPress={handleSignIn}
        bgVariant="primary"
        className="mt-5"
      />
      <View className="w-full flex flex-row justify-center items-center mb-5">
        <Link href="/(auth)/sign-up" className="text-white">
          Dont already have an account?
          <Text className="text-secondary">Register</Text>
        </Link>
      </View>
      <SocialAuthProvider />
    </CustomScrollView>
  );
};

export default SignInScreen;
