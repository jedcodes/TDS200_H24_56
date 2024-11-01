import { View, Text, Pressable } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/type";
import Icon from "@/assets/icons";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "primary":
      return "bg-primary-green";
    case "secondary":
      return "bg-transparent border border-primary-green";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
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
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
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
  btnRound = "rounded-full",
  bgVariant = "primary",
  textVariant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      {...props}
      className={`flex p-5 mb-4 w-full flex-row items-center justify-center shadow-md shadow-neutral-400 ${btnRound} ${getBgVariantStyle(
        bgVariant
      )} ${className}`}
    >
      {IconLeft && <Icon name={IconLeft} color={iconColor} />}
      <Text
        className={`text-xl font-playfairSM ${getTextVariantStyle(
          textVariant
        )}`}
      >
        {title}
      </Text>
      {IconRight && <Icon name={IconRight} color={iconColor} />}
    </Pressable>
  );
};

export default CustomButton;
