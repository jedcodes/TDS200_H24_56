import { useState } from "react";
import { Toast } from "toastify-react-native";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useProfileStore from "@/store/useProfileStore";

const useDeletePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { deletePost } = useProfileStore();

  const onDeletePost = async (id: string, ArtistId: string) => {
    setIsLoading(true);

    try {
      const artistRef = doc(db, "artists", ArtistId);
      await deleteDoc(doc(db, "posts", id));
      await updateDoc(artistRef, {
        posts: arrayRemove(id),
      });
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
