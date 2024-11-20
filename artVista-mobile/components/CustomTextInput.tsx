import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React from "react";
import { InputInputFieldProps } from "@/types/type";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Feather from "@expo/vector-icons/Feather";

const CustomTextInput = ({
  label,
  icon,
  iconRight,
  labelStyle,
  containerStyle,
  iconStyle,
  inputStyle,
  className,
  secureTextEntry = false,
  ...props
}: InputInputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{ height: hp(7), borderWidth: 0.4, borderCurve: "continuous" }}
        className={`flex-row px-4 bg-primary-gary items-center gap-4 rounded-2xl border-primary-gary ${containerStyle}`}
      >
        {icon && <Feather name={icon} size={hp(2.7)} color={"gray"} />}
        <TextInput
          placeholderTextColor={"gray"}
          autoCapitalize="none"
          style={{ fontSize: hp(2) }}
          className={`flex-1 font-interSemiBold text-neutral-700 ${inputStyle}`}
          secureTextEntry={secureTextEntry}
          {...props}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CustomTextInput;
