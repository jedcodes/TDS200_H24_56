import { useAuth } from "@/context/authContext";
import { auth, db } from "@/lib/firebase";
import { Artist } from "@/types/type";
import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Toast } from "toastify-react-native";

const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useAuth();

  const handleGoogleAuth = async () => {
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const cendentials = await signInWithPopup(auth, provider);

      const artistRef = doc(db, "artists", cendentials.user.uid);
      const artistDoc = await getDoc(artistRef);

      if (artistDoc.exists()) {
        setUser(artistDoc.data() as User);
      } else {
        const newArtist: Artist = {
          id: cendentials.user.uid,
          email: cendentials.user.email,
          displayName: cendentials.user.displayName || "",
          username: cendentials.user.displayName || "",
          photoURL: cendentials.user.photoURL || "",
          posts: [],
          followers: [],
          following: [],
          createAt: Date.now(),
        };
        setDoc(artistRef, newArtist);
        setUser(artistDoc.data() as User);
      }
    } catch (error: any) {
      Toast.error("An error occurred. Please try again later", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleGoogleAuth };
};

export default useGoogleAuth;
