import { useState } from "react";
import { Artist } from "@/types/type";
import { Toast } from "toastify-react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const useSearchArtist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Artist | null>(null);

  const searchArtist = async (username: string) => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "artists"),
        where("username", "==", username)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Toast.error("Artist not found");
        setSearchResults(null);
        return;
      }

      querySnapshot.forEach((doc) => {
        setSearchResults(doc.data() as Artist);
      });
    } catch (error) {
      Toast.error("An error occurred while searching for the artist");
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, searchResults, searchArtist };
};

export default useSearchArtist;
