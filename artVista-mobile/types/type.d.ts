import { PressableProps, TextInputProps } from "react-native";
import { LocationObjectCoords } from "expo-location";
import { User } from "firebase/auth";

export type ScreenContainerProps = {
  children: ReactNode;
  bgColor?: string;
  containerrStyle?: string;
};

export interface AuthContextType {
  artist: null | User;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User) => void;
  signout: () => void;
}

export type ProfileStoreState = {
  profilePosts: Post[];
  setProfilePosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  deletePost: (postId: string) => void;
};

export interface PostStoreState {
  posts: Post[];
  comments: Comment[];
  addPost: (post: Post) => void;
  setPosts: (posts: Post[]) => void;
  addComment: (postId: string, comment: Comment) => void;
  setComments: (comments: Comment[]) => void;
  deletePost: (postId: string) => void;
  deleteComment: (commentId: string) => void;
}

// export type FeedStoreState = {
//   imageUrl: string | null;
// };

// export type FeedStoreAction = {
//   updateImageUrl: (imageUrl: State["imageUrl"]) => void;
// };

export type ImageStoreState = {
  imageUrl: string | null;
};

export type ImageStoreAction = {
  updateImageUrl: (imageUrl: State["imageUrl"]) => void;
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
  displayName: string;
  username: string;
  photoURL: string;
  email: string;
  posts: string[];
  favorites: string[];
  followers: string[];
  following: string[];
  createAt: number;
}

declare interface Post {
  id?: string;
  artistId: string;
  title: string;
  description: string;
  hashtags: string;
  category: string;
  likes: string[];
  comments: Comment[];
  imageUrl?: string;
  location: LocationGeocodedAddress | null;
  createdAt: number;
}

declare interface Comment {
  id?: string;
  artistId: string;
  postId: string;
  comment: string;
  createAt: number;
}

declare interface CommentsObject {
  id: string;
  comment: Comment;
}
