import { PressableProps, TextInputProps } from "react-native";
import { LocationObjectCoords } from "expo-location";

export type ScreenContainerProps = {
  children: ReactNode;
  bgColor?: string;
};

export type ProfileStoreState = {
  artisitProfile: Artist | null;
  setProfile: (profile: Artist) => void;
  addPost: (post: Post) => void;
  deletePost: (postId: string) => void;
};

export type PostStoreState = {
  posts: Post[];
  createPost: (post: Post) => void;
  deletePost: (postId: string) => void;
  setPosts: (posts: Post[]) => void;
  addComment: (postId: string, comment: Comment) => void;
};

export type FeedStoreState = {
  imageUrl: string | null;
  description: string;
  category: string;
  hashtags: string;
  title: string;
};

export type FeedStoreAction = {
  updateImageUrl: (imageUrl: State["imageUrl"]) => void;
  updateDescription: (description: State["description"]) => void;
  updateCategory: (category: State["category"]) => void;
  updateHashtags: (hashtags: State["hashtags"]) => void;
  updateTitle: (title: State["title"]) => void;
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
  photoURL?: string;
  email?: string;
  username?: string;
  posts?: string[];
  favorites?: string[];
  followers?: string[];
  following?: string[];
  bio?: string;
  createAt: number;
}

declare interface Post {
  id: string;
  artistId: string;
  title: string;
  description: string;
  hashtags: string;
  category: string;
  likes: string[];
  comments: Comment[];
  imageUrl?: string;
  location: LocationObjectCoords | null;
  createdAt: number;
}

declare interface Comment {
  id: string;
  artistId: string;
  artistName: string;
  comment: string;
  createAt: number;
}

declare interface CommentObject {
  id: string;
  comment: Comment;
}
