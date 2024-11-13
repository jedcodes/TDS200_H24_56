import Toast from "react-native-toast-message";
import { v4 as uuidv4 } from "uuid";
import usePostStore from "@/store/usePostStore";
import { Post } from "@/types/type";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import useFeedStore from "@/store/useFeedStore";
import { useAuth } from "@/context/authContext";

const useCreatePost = () => {
  const { artist } = useAuth();
  const createPost = usePostStore((state) => state.createPost);
  const { imageUrl, title, description, category, hashtags } = useFeedStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreatePost = async () => {
    setIsLoading(true);
    const newPost: Post = {
      id: uuidv4(),
      title,
      description,
      category,
      hashtags,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      artistId: artist?.uid!,
      location: null,
    };
    const response = await fetch(imageUrl!);
    const blob = await response.blob();

    try {
      const postDocRef = await addDoc(collection(db, "posts"), newPost);
      const artistDocRef = doc(db, "artists", artist?.uid!);
      const storageRef = ref(storage, "posts/" + new Date().toISOString());

      await updateDoc(artistDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadBytesResumable(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      await updateDoc(postDocRef, { imageUrl: url });
      newPost.imageUrl = url;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create post",
      });
    }
  };

  return { handleCreatePost, isLoading };
};

export default useCreatePost;
