import { View, Text, Image } from "react-native";
import React from "react";
import ScreenContainer from "@/components/ScreenContainer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TextInputField from "@/components/TextInputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignUpScreen = () => {
  return (
    <ScreenContainer bgColor="bg-white">
      <View className="my-10">
        <Text style={{ fontSize: hp(4) }} className="font-playfairEB">
          Welcome
        </Text>
        <Text className="font-playfairSM text-2xl tracking-wider">Sign Up</Text>
      </View>
      <View>
        <TextInputField
          label="Full name"
          icon={"user"}
          placeholder="Enter your full name"
        />
        <TextInputField
          label="Email"
          icon={"mail"}
          placeholder="Enter your email"
        />
        <TextInputField
          label="Password"
          icon={"lock"}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
        <CustomButton title="Sign up" />
      </View>
      <View className="w-full flex flex-row justify-center items-center mb-5">
        <Link href="/(auth)/sign-in">
          Do you already have an account?
          <Text className="ml-2 text-primary-green">Log in</Text>
        </Link>
      </View>
      <CustomButton
        title="Login with Apple"
        bgVariant="secondary"
        textVariant="secondary"
        btnRound="rounded-lg"
        IconLeft={"apple"}
        iconColor="white"
      />
      <CustomButton
        title="Login with Google"
        btnRound="rounded-lg"
        bgVariant="secondary"
        textVariant="secondary"
        IconLeft={"google"}
        iconColor="white"
      />
    </ScreenContainer>
  );
};

export default SignUpScreen;
