import { useAuth } from "@/context/authContext";
import { db, storage } from "@/lib/firebase";
import { doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const useEditProfile = () => {
  const { artist } = useAuth();

  const editProfile = async (imageUrl: string) => {
    const response = await fetch(imageUrl!);
    const blob = await response.blob();

    try {
      const storageRef = ref(storage, "profile/" + new Date().toISOString());

      const profileDocRef = doc(db, "artists", artist?.uid!);

      await uploadBytesResumable(storageRef, blob);
      const url = await getDownloadURL(storageRef);
    } catch (error) {
      console.log("An error occurred while creating post");
    }
  };

  return { editProfile };
};

export default useEditProfile;
