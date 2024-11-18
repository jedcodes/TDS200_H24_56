import { db, storage } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useFetchArtist from "./useFetchArtist";
import { Artist } from "@/types/type";

const useEditProfile = () => {
  const { artist } = useFetchArtist();

  const editProfile = async (formInput: Artist) => {
    const response = await fetch(formInput.photoURL!);
    const blob = await response.blob();

    try {
      const storageRef = ref(storage, "profile/" + new Date().toISOString());

      const profileDocRef = doc(db, "artists", artist?.id!);

      await uploadBytesResumable(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      const updatedData: Artist = {
        ...artist,
        username: formInput.username || artist?.username,
        bio: formInput.bio || artist?.bio,
        phone: formInput.phone! || artist?.phone!,
        location: formInput.location! || artist?.location!,
        photoURL: url,
      };

      await updateDoc(profileDocRef, updatedData);
    } catch (error) {
      console.log("An error occurred while creating post");
    }
  };

  return { editProfile };
};

export default useEditProfile;
