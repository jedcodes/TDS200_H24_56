import { useState } from "react";
import useProfileStore from "@/store/useProfileStore";
import { Toast } from "toastify-react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Post } from "@/types/type";

const useFetchProfilePosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setProfilePosts } = useProfileStore();

  const getProfilePosts = async (artistId: string) => {
    setIsLoading(true);

    try {
      const q = query(
        collection(db, "posts"),
        where("artistId", "==", artistId)
      );
      const querySnapshot = await getDocs(q);
      const posts: Post[] = [];
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id } as Post);
      });
      setProfilePosts(posts);
    } catch (error) {
      Toast.error("Failed to fetch artist posts");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getProfilePosts };
};

export default useFetchProfilePosts;
