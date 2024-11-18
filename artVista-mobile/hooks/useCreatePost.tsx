import { v4 as uuidv4 } from "uuid";
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
import useFeedStore from "@/store/useFeedStore";
import { useAuth } from "@/context/authContext";
import * as Location from "expo-location";
import { Toast } from "toastify-react-native";

const useCreatePost = () => {
  const { artist } = useAuth();
  const createPost = usePostStore((state) => state.createPost);
  const { imageUrl, title, description, category, hashtags } = useFeedStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const coordinatesData = useRef<Location.LocationObjectCoords | null>(null);

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

  const handleCreatePost = async () => {
    setIsLoading(true);

    const response = await fetch(imageUrl!);
    const blob = await response.blob();

    try {
      const storageRef = ref(storage, "posts/" + new Date().toISOString());

      const artistDocRef = doc(db, "artists", artist?.uid!);

      await uploadBytesResumable(storageRef, blob);
      const url = await getDownloadURL(storageRef);

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
        location: location,
        imageUrl: url,
      };

      const postDocRef = await addDoc(collection(db, "posts"), newPost);
      await updateDoc(artistDocRef, { posts: arrayUnion(postDocRef.id) });
      createPost({ ...newPost, id: postDocRef.id });
    } catch (error) {
      Toast.error("An error occurred while creating post");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreatePost, isLoading };
};

export default useCreatePost;
