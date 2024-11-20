import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/type";
import Icon from "@/assets/icons";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "primary":
      return "bg-secondary";
    case "secondary":
      return "bg-primary";
    default:
      return "bg-transparent";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-white";
    case "secondary":
      return "text-black";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  title,
  onPress,
  IconLeft,
  IconRight,
  iconColor,
  className,
  isLoading,
  btnRound = "rounded-full",
  bgVariant = "primary",
  textVariant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      {...props}
      className={`flex p-5 mb-4 w-full flex-row items-center justify-center ${btnRound} ${getBgVariantStyle(
        bgVariant
      )} ${className}`}
    >
      {IconLeft && <Icon name={IconLeft} color={iconColor} />}
      {isLoading ? (
        <ActivityIndicator size={"large"} color={"#FCFCFC"} />
      ) : (
        <Text
          className={`text-2xl font-interMedium ${getTextVariantStyle(
            textVariant
          )}`}
        >
          {title}
        </Text>
      )}
      {IconRight && <Icon name={IconRight} color={iconColor} />}
    </Pressable>
  );
};

export default CustomButton;
