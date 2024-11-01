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
      <View className="my-2 w-full mx-4">
        <Text className={`text-lg font-playfairSB ${labelStyle}`}>{label}</Text>
        <View
          className={`flex flex-row items-center border rounded-full border-neutral-500 p-4 active:border-primary-green ${containerStyle}`}
        >
          {icon && <Icon name={icon} />}
          <TextInput
            className={`w-full font-playfairRegular ml-2  ${inputStyle}`}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TextInputField;
