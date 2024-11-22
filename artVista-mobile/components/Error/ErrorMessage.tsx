import { View, Text } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ErrorMessage = () => {
  return (
    <View className="items-center justify-center flex-1">
      <Text style={{ fontSize: hp(15) }} className="text-neutral-400">
        Screen 404!
      </Text>
    </View>
  );
};

export default ErrorMessage;
