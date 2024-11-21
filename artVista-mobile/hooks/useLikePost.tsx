import { View, Text } from "react-native";
import React, { useState } from "react";
import useFetchArtist from "./useFetchArtist";
import { Toast } from "toastify-react-native";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Post } from "@/types/type";

const useLikePost = (post: Post) => {
  const [isLoading, setIsLoading] = useState(false);
  const { artist } = useFetchArtist();
  // State variabler som holder styr på om posten er likt og antall likes
  const [isLiked, setIsLiked] = useState(post.likes.includes(artist?.id!));
  const [likes, setLikes] = useState(post.likes.length);

  const likePost = async () => {
    setIsLoading(true);
    try {
      const postRef = doc(db, "posts", post.id);
      // Sjekker om Likes Array inneholder artist id, hvis den gjør det så betyr det at artisten har likt posten hvis ikke så betyr det at artisten ikke har likt posten.
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(artist?.id) : arrayUnion(artist?.id),
      });

      //Her flipper vi isLiked variabelen og oppdaterer likes variabelen basert på om artisten har likt posten eller ikke.
      setIsLiked(!isLiked);
      // Hvis artisten har likt posten så trekker vi fra en like hvis ikke så legger vi til en like.
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      Toast.error("Failed to like post");
      console.log("Liked post error: ", error);
    }
  };

  return { isLiked, likes, isLoading, likePost };
};

export default useLikePost;
