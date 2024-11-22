import usePostStore from "@/store/usePostStore";
import { Post } from "@/types/type";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "@/context/authContext";
import * as Location from "expo-location";
import { Toast } from "toastify-react-native";
import useImageStore from "@/store/useImageStore";

const useCreatePost = () => {
  const { artist } = useAuth();
  const { imageUrl } = useImageStore();
  const addPost = usePostStore((state) => state.addPost);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const coordinatesData = useRef<Location.LocationObjectCoords | null>(null);

  //Denne useEffecten har en funksjon som henter lokasjonen til brukeren og lagrer den i coordinatesData.current.
  // Vi henter også adressen til brukeren og lagrer den i location.
  useEffect(() => {
    const getCurrentLoaction = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.error("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      coordinatesData.current = location.coords;
      const locationAddress = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocation(locationAddress[0]);
    };
    getCurrentLoaction();
  }, []);

  const handleCreatePost = async (
    title: string,
    description: string,
    category: string,
    hashtags: string
  ) => {
    setIsLoading(true);

    const response = await fetch(imageUrl!);
    const blob = await response.blob();

    try {
      const storageRef = ref(storage, "posts/" + new Date().toISOString());
      const artistDocRef = doc(db, "artists", artist?.uid!);

      await uploadBytesResumable(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      // Oppretter et nytt postobjekt som skal lager i databasen.
      const newPost: Post = {
        title,
        description,
        category,
        hashtags,
        likes: [],
        comments: [],
        createdAt: Date.now(),
        artistId: artist?.uid!,
        location: coordinatesData.current,
        imageUrl: url,
      };

      const postDocRef = await addDoc(collection(db, "posts"), newPost);
      await updateDoc(artistDocRef, { posts: arrayUnion(postDocRef.id) });
      //Her jeg bruker postRef som id for alle innleggere som er lagret i databasen.
      addPost({ ...newPost, id: postDocRef.id });
      Toast.success("Post created successfully");
    } catch (error) {
      Toast.error("An error occurred while creating post");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreatePost, isLoading };
};

export default useCreatePost;
