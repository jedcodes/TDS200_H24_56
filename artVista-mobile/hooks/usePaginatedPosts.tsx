import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  startAfter,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { Post } from "@/types/type";

const usePaginatedPosts = (pageSize: number = 2) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPosts = async () => {
    setIsLoading(true);

    try {
      const postQuery = lastDoc
        ? query(
            collection(db, "posts"),
            orderBy("title", "desc"),
            startAfter(lastDoc),
            limit(pageSize)
          )
        : query(
            collection(db, "posts"),
            orderBy("title", "desc"),
            limit(pageSize)
          );

      const querySnapshots = await getDocs(postQuery);
      const lastVisible = querySnapshots.docs[querySnapshots.docs.length - 1];

      const newPosts = querySnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Post[];

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLastDoc(lastVisible);

      // If fewer than pageSize documents were fetched, we're at the end
      setHasMore(querySnapshots.docs.length === pageSize);
    } catch (error) {
      console.error("Error fetching paginated posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to load more posts
  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchPosts();
    }
  };

  // Automatically fetch initial posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, isLoading, loadMore, hasMore };
};

export default usePaginatedPosts;
