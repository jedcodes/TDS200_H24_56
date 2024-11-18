import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Artist } from "@/types/type";
import { Toast } from "toastify-react-native";

const useSignup = () => {
  const signup = async (email: string, password: string, username: string) => {
    // if statement sjekker om email, password eller username er tomme. Hvis en av de er tomme, vises en feilmelding

    // Her legde jeg Ref til hvor alle artistene skal lagres i firestore
    const artistRef = collection(db, "artists");
    // Her lager jeg en query som sjekker om det er en artist med samme username som den som prøver å registrere seg
    const q = query(artistRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    // Hvis querySnapshot ikke er tom, betyr det at det er en artist med samme username som den som prøver å registrere seg
    if (!querySnapshot.empty) {
      Toast.error(
        "Brukeren eksisterer allerede. Vennligst velg et annet brukernavn"
      );
      return;
    }

    try {
      // Her prøver jeg å lage en ny artist med email og password og deretter sjekker om artisten ble laget
      const newArtist = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!newArtist) {
        Toast.error("Det har oppstått en feil Veenligst prøv igjen senere");
        return;
      }
      // Hvis artisten ble laget, lager jeg en artistData som inneholder email, username og andre data som skal lagres i firestore
      if (newArtist) {
        const artistData: Artist = {
          id: newArtist.user.uid,
          email,
          username,
          bio: "",
          displayName: "",
          photoURL: "",
          location: "",
          phone: "",
          posts: [],
          favorites: [],
          followers: [],
          following: [],
          createAt: Date.now(),
        };

        await setDoc(doc(db, "artists", newArtist.user.uid), artistData);
        Toast.success(
          "Brukeren ble laget Du er nå logget inn! Velkommen til ArtVista 🎉"
        );
      }
    } catch (error) {
      Toast.error("Noe gikk galtPrøv igjen senere");
    }
  };
  return { signup };
};

export default useSignup;
