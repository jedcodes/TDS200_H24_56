import { db } from "@/lib/firebase";
import { Artist } from "@/types/type";
import { doc, getDoc } from "firebase/firestore";

export const getArtistData = async (id: string) => {
  try {
    const docRef = doc(db, "artists", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as Artist;
    }
  } catch (error) {}
};
