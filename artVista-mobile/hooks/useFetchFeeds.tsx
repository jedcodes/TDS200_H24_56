import { db } from "@/lib/firebase";
import usePostStore from "@/store/usePostStore";
import { Post } from "@/types/type";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useFetchFeeds = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { posts, setPosts } = usePostStore();

  useEffect(() => {}, []);

  return { isLoading, posts };
};

export default useFetchFeeds;
