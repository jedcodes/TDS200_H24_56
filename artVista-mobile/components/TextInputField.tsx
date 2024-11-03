import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import React from "react";
import { InputInputFieldProps } from "@/types/type";
import Icon from "@/assets/icons";

const TextInputField = ({
  label,
  icon,
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
      <View className="my-5 w-full">
        <View
          className={`flex flex-row items-center border rounded-2xl bg-primary border-neutral-500 p-4 active:border-primary-green ${containerStyle}`}
        >
          {icon && <Icon name={icon} color={iconStyle} />}
          <TextInput
            autoCapitalize="none"
            placeholderTextColor={"#A0A0A0"}
            className={`w-full font-interRegular text-neutral-100 ml-2  ${inputStyle}`}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TextInputField;
