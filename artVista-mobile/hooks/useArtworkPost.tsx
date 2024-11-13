import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

const useArtworkPost = () => {
  const q = query(collection(db, "artworks"), orderBy("date", "desc"));

  const [artworks, loading, error] = useCollectionData(q);

  return { artworks, loading, error };
};

export default useArtworkPost;
