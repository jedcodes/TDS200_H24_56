import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import Toast from "react-native-toast-message";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Artist } from "@/types/type";

const useSignup = () => {
  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const signup = async (email: string, password: string, username: string) => {
    // if statement sjekker om email, password eller username er tomme. Hvis en av de er tomme, vises en feilmelding
    if (email === "" || password === "" || username === "") {
      Toast.show({
        type: "error",
        text1: "Invild Input",
        text2: "Username, email or password is empty",
      });
      return;
    }

    // Her legde jeg Ref til hvor alle artistene skal lagres i firestore
    const artistRef = collection(db, "artists");
    // Her lager jeg en query som sjekker om det er en artist med samme username som den som prøver å registrere seg
    const q = query(artistRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    // Hvis querySnapshot ikke er tom, betyr det at det er en artist med samme username som den som prøver å registrere seg
    if (!querySnapshot.empty) {
      Toast.show({
        type: "error",
        text1: "Username is taken",
        text2: "Please choose another username",
      });
      return;
    }

    try {
      // Her prøver jeg å lage en ny artist med email og password og deretter sjekker om artisten ble laget
      const newArtist = await createUserWithEmailAndPassword(email, password);
      if (!newArtist && error) {
        Toast.show({
          type: "error",
          text1: "There was a problem creating your account",
          text2: "Please try again!",
        });
        return;
      }
      // Hvis artisten ble laget, lager jeg en artistData som inneholder email, username og andre data som skal lagres i firestore
      if (newArtist) {
        const artistData: Artist = {
          id: newArtist.user.uid,
          email: email,
          username: username,
          bio: "",
          displayName: "",
          photoURL: "",
          posts: [],
          favorites: [],
          followers: [],
          following: [],
          createAt: Date.now(),
        };

        await setDoc(doc(db, "artists", newArtist.user.uid), artistData);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again",
      });
    }
  };

  return { signup, loading, error };
};

export default useSignup;
