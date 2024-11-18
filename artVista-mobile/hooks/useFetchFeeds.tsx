import { db } from "@/lib/firebase";
import usePostStore from "@/store/usePostStore";
import { Post } from "@/types/type";
import { getDocs, collection, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

const useFetchFeeds = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setPosts, posts } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const postQuery = query(collection(db, "posts"));
      try {
        const querySnapshot = await getDocs(postQuery);
        const feeds: Post[] = [];
        querySnapshot.forEach((doc) => {
          feeds.push({ id: doc.id, ...doc.data() } as Post);
        });

        feeds.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feeds);
      } catch (error) {
        Toast.error("Error fetching posts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return { isLoading, posts };
};

export default useFetchFeeds;
