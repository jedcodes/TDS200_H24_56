import { db } from "@/lib/firebase";
import { Post } from "@/types/type";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useFetchFeedById = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", id));
        const selectedPost = { ...postDoc.data(), id: postDoc.id } as Post;
        setPost(selectedPost);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to fetch post",
        });
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, []);

  return { isLoading, post };
};

export default useFetchFeedById;
