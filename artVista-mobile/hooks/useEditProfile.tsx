import { db, storage } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useFetchArtist from "./useFetchArtist";
import { Artist } from "@/types/type";
import useImageStore from "@/store/useImageStore";

const useEditProfile = () => {
  const { artist } = useFetchArtist();
  const { imageUrl } = useImageStore();

  if (!artist) return null;

  const editProfile = async (formInput: Artist) => {
    const response = await fetch(imageUrl!);
    const blob = await response.blob();

    try {
      const storageRef = ref(storage, "profile/" + new Date().toISOString());

      const profileDocRef = doc(db, "artists", artist?.id!);

      await uploadBytesResumable(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      const newDoc: Artist = {
        ...artist,
        username: formInput.username || artist?.username!,
        photoURL: url,
      };

      await updateDoc(profileDocRef, newDoc);
    } catch (error) {
      console.log("An error occurred while creating post");
    }
  };

  return { editProfile };
};

export default useEditProfile;
