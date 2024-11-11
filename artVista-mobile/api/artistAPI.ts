import { db } from "@/lib/firebase";
import { Artist } from "@/types/type";
import { collection, doc, getDoc, query, where } from "firebase/firestore";

export const isUsernameExists = async (username: string) => {
  try {
    const q: any = query(
      collection(db, "artists"),
      where("username", "==", username)
    );
    const querySnapshot = await getDoc(q);
    return querySnapshot.exists();
  } catch (error) {
    console.log(error);
  }
};

export const getArtistData = async (id: string) => {
  try {
    const docRef = doc(db, "artists", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as Artist;
    }
  } catch (error) {}
};
