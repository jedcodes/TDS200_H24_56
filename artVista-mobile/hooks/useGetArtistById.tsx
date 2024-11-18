import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Artist } from "@/types/type";
import { Toast } from "toastify-react-native";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const useGetArtistById = (artistId: string) => {
  const [artistProfile, setArtistProfile] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const userRef = await getDoc(doc(db, "artists", artistId));
        if (userRef.exists()) {
          setArtistProfile(userRef.data() as Artist);
        }
      } catch (error) {
        Toast.error("Error fetching user profile");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [artistId, setArtistProfile]);
  return { artistProfile, isLoading };
};

export default useGetArtistById;
