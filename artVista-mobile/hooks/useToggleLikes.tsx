import { db } from "@/lib/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";

const useToggleLikes = () => {
  const togglePostLike = async (postId: string, artistId: string) => {
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return;
    }

    if (postDoc.data()?.likes.includes(artistId)) {
      await updateDoc(postRef, {
        likes: arrayRemove(artistId),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(artistId),
      });
    }
  };

  return { togglePostLike };
};

export default useToggleLikes;
