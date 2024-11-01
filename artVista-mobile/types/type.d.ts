import { PressableProps, TextInputProps } from "react-native";

export type ScreenContainerProps = {
  children: ReactNode;
  bgColor: string;
};

declare interface ButtonProps extends PressableProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "success";
  textVariant?: "primary" | "secondary" | "danger" | "success";
  btnRound?: "rounded-lg" | "rounded-full";
  IconLeft?: any;
  IconRight?: any;
  iconColor?: string;
  className?: string;
}

declare interface InputInputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}
