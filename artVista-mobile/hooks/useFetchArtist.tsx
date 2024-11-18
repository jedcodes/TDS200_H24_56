import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { Artist } from "@/types/type";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/authContext";

const useFetchArtist = () => {
  const { artist: user } = useAuth();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const getArtistData = async (id: string) => {
      try {
        const docRef = doc(db, "artists", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArtist({ ...docSnap.data(), id: docSnap.id } as Artist);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getArtistData(user?.uid as string);
  }, []);

  return { artist, isLoading, error };
};

export default useFetchArtist;
