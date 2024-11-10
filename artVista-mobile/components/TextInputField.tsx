import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { InputInputFieldProps } from "@/types/type";
import Icon from "@/assets/icons";

const TextInputField = ({
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-interSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start pl-2 items-center border-[3px] rounded-full bg-neutral-50 border-gray-400 ${containerStyle}`}
          >
            {icon && <Icon name={icon} color={iconStyle} />}
            <TextInput
              autoCapitalize="none"
              placeholderTextColor={"#9ca3af"}
              className={`font-interSemiBold w-full p-4 text-[15px] text-left text-neutral-600 rounded-full ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TextInputField;
