import useFetchArtist from "./useFetchArtist";
import { Comment } from "@/types/type";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "toastify-react-native";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";
import usePostStore from "@/store/usePostStore";

const useAddComment = () => {
  const { artist } = useFetchArtist();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addComment } = usePostStore();

  const postComment = async (postId: string, comment: string) => {
    console.log("commentId: ", postId);
    setIsLoading(true);
    const newComment: Comment = {
      id: uuidv4(),
      comment,
      artistId: artist?.id!,
      postId,
      createAt: Date.now(),
    };
    try {
      // Her lager vi en ny kolleksjon i databasen og legger til en ny kommentar, og vi lager id til kommentaren i posts kolleksjonen. På denne måten kan vi hente kommentarene til en post via id.
      // const commentRef = await addDoc(collection(db, "comments"), newComment);
      await updateDoc(doc(db, "posts", postId), {
        comments: arrayUnion(newComment),
      });
      addComment(postId, newComment);
    } catch (error: any) {
      Toast.error("Failed to post comment");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { postComment, isLoading };
};

export default useAddComment;
