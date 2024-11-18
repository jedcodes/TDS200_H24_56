import { db } from "@/lib/firebase";
import { Post } from "@/types/type";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";

const usePaginatedPosts = () => {
  const getPaginatedPosts = async (
    getFromDoc: QueryDocumentSnapshot<DocumentData, DocumentData> | null
  ) => {
    if (getFromDoc) {
      const next = query(
        collection(db, "posts"),
        orderBy("title", "desc"),
        startAfter(getFromDoc),
        limit(2)
      );
      const querySnapshots = await getDocs(next);

      const last = querySnapshots.docs[querySnapshots.docs.length - 1];
      const snapshots = querySnapshots.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Post;
      });
      return { snapshots, last };
    }
    const first = query(
      collection(db, "posts"),
      orderBy("title", "desc"),
      limit(2)
    );
    const querySnapshots = await getDocs(first);

    const last = querySnapshots.docs[querySnapshots.docs.length - 1];
    const snapshots = querySnapshots.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as Post;
    });
    return { snapshots, last };
  };

  return { getPaginatedPosts };
};

export default usePaginatedPosts;
