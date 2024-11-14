import { db } from "@/lib/firebase";
import { Post } from "@/types/type";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetchFeedById = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await getDoc(doc(db, "posts", id));
      const selectedPost = { ...postDoc.data(), id: postDoc.id } as Post;
      setPost(selectedPost);
    };
    fetchPost();
  }, []);

  return { isLoading, post };
};

export default useFetchFeedById;
