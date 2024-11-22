import { useState } from "react";
import { Post } from "@/types/type";
import { Toast } from "toastify-react-native";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const useSeach = () => {
  const [searchResults, setSearchResults] = useState<Post[] | null>(null);

  const searchPost = async (searchText: string) => {
    try {
      const q = query(
        collection(db, "posts"),
        or(
          where("title", "==", searchText),
          where("category", "==", searchText)
        )
      );

      const querySnapshot = await getDocs(q);
      const results: Post[] = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data() as Post);
      });
      setSearchResults(results);
    } catch (error) {
      console.error(error);
      Toast.error("An error occurred while searching for the post");
    }
  };

  return { searchResults, searchPost };
};

export default useSeach;
