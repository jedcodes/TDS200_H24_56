import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storageRef } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { ArtWork } from "@/types/type";

export const uploadArtwork = async (artwork: ArtWork) => {
  const fetchResponse = await fetch(artwork.imageUrl!);
  const blob = await fetchResponse.blob();

  const mediaStoreRef = storageRef("MediaStore/" + new Date().getTime());

  uploadBytesResumable(mediaStoreRef, blob)
    .then((_snapshot) => {
      console.log("File uploaded successfully!");
    })
    .then((_response) => {
      getDownloadURL(mediaStoreRef).then(async (url) => {
        const artworkDetail: ArtWork = {
          ...artwork,
          imageUrl: url,
        };
        await setDoc(
          doc(db, "artworks", "artwork_" + new Date().getTime().toString()),
          artworkDetail
        );
      });
    });
};

export const getAllArtworks = async () => {
  const docsRef = collection(db, "artworks");
  const docsSnap = await getDocs(docsRef);

  return docsSnap.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as ArtWork;
  });
};

export const getArtworkById = async (id: string) => {
  console.log("id", id);
  try {
    const docRef = doc(db, "artworks", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as ArtWork;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
  }
};
