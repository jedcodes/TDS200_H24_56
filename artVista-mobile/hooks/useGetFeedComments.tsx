import { useEffect, useState } from "react";
import { Comment, CommentsObject } from "@/types/type";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Toast } from "toastify-react-native";
import usePostStore from "@/store/usePostStore";

const useGetFeedComments = (postID: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setComments, comments } = usePostStore();

  useEffect(() => {
    const getPostComments = async () => {
      setIsLoading(true);
      try {
        const postRef = await getDoc(doc(db, "posts", postID));
      } catch (error) {
        Toast.error("Failed to get comments");
      } finally {
        setIsLoading(false);
      }
    };
  }, [postID]);

  return { isLoading, comments };
};

export default useGetFeedComments;
