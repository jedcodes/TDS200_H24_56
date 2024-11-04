import { PressableProps, TextInputProps } from "react-native";
import { LocationObjectCoords } from "expo-location";

export type ScreenContainerProps = {
  children: ReactNode;
  bgColor?: string;
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
  label?: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface ArtWork {
  id: string;
  title: string;
  description: string;
  hastags: string[];
  category: string;
  likes: string[];
  comments: string[];
  author: string;
  imageUrl: string;
  location: LocationObjectCoords | null;
}

declare interface Comment {
  artistId: string;
  artistName: string;
  comment: string;
}

declare interface CommentObject {
  id: string;
  comment: Comment;
}
