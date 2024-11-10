import { PressableProps, TextInputProps } from "react-native";
import { LocationObjectCoords } from "expo-location";

export type ScreenContainerProps = {
  children: ReactNode;
  bgColor?: string;
};

export type ArtworkState = {
  imageUrl: string | null;
  description: string;
  category: string;
  hashtags: string;
  title: string;
  isUploading: boolean;
};

export type ArtworkAction = {
  updateImageUrl: (imageUrl: State["imageUrl"]) => void;
  updateDescription: (description: State["description"]) => void;
  updateCategory: (category: State["category"]) => void;
  updateHashtags: (hashtags: State["hashtags"]) => void;
  updateTitle: (title: State["title"]) => void;
  updateIsUploading: (isUploading: State["isUploading"]) => void;
};

declare interface ButtonProps extends PressableProps {
  title: string;
  bgVariant?: "primary" | "secondary";
  textVariant?: "primary" | "secondary";
  btnRound?: "rounded-lg" | "rounded-full";
  IconLeft?: any;
  IconRight?: any;
  iconColor?: string;
  className?: string;
  isLoading?: boolean;
}

declare interface InputInputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  iconRight?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface Artist {
  id: string;
  displayName?: string;
  photoURL: string | null;
  email: string;
  username: string;
  favoriteArtworks: string[];
}

declare interface ArtWork {
  id: string;
  artistId: string;
  title: string;
  description: string;
  hashtags: string;
  category: string;
  likes: string[];
  comments: string[];
  imageUrl: string | null;
  location: LocationObjectCoords | null;
  createAt: Date;
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
