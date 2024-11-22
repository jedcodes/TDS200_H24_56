import { useState } from "react";
import usePostStore from "@/store/usePostStore";
import { Toast } from "toastify-react-native";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const useDeletePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { deletePost } = usePostStore();

  const onDeletePost = async (id: string) => {
    setIsLoading(true);

    try {
      await deleteDoc(doc(db, "posts", id));
      deletePost(id);
      Toast.success("Post deleted successfully");
    } catch (error: any) {
      console.log(error);
      Toast.error("Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onDeletePost };
};

export default useDeletePost;
