import { db } from "@/lib/firebase";
import usePostStore from "@/store/usePostStore";
import { Post } from "@/types/type";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useFetchFeeds = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { posts, setPosts } = usePostStore();

  useEffect(() => {
    const fetchFeeds = async () => {
      setIsLoading(true);
      const q = query(collection(db, "artworks"), orderBy("data", "desc"));

      try {
        const querySnapshot = await getDocs(q);
        const feedPost: Post[] = [];

        querySnapshot.forEach((doc) => {
          feedPost.push({ id: doc.id, ...doc.data() } as Post);
        });

        setPosts(feedPost);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeeds();
  }, [setPosts]);

  return { isLoading, posts };
};

export default useFetchFeeds;
