import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storageRef } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ArtWork } from "@/types/type";
import useArtWorkStore from "@/store/useArtWorkStore";

export const uploadImage = async (artWork: ArtWork, fileType: string) => {
  const fetchResponse = await fetch(artWork.imageUrl);
  const blob = await fetchResponse.blob();
  const updateProgress = useArtWorkStore((state) => state.updateProgress);

  const mediaStoreRef = storageRef("MediaStore/" + new Date().getTime());

  const uploadMedia = uploadBytesResumable(mediaStoreRef, blob);

  // Lytter etter eventer som skjer under opplastingen for å gi brukeren en bedre opplevelse
  uploadMedia.on(
    "state_changed",
    (snapshot) => {
      // Her kan vi f.eks. vise en progressbar ved å regne ut prosenten av opplastingen som er ferdig delt på totalt antall bytes som skal lastes opp
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log("Presisjon: " + progress + "%");
      updateProgress(progress);
    },
    (error) => console.log(error)
  ),
    () => {
      getDownloadURL(uploadMedia.snapshot.ref).then(async (downloadUrl) => {
        console.log("Bilde opplastet til: " + downloadUrl);
        // lagre bildet i databasen sammen med andre data
        const docRef = await addDoc(collection(db, "artWorks"), {
          ...artWork,
          imageUrl: downloadUrl,
          createdAt: new Date(),
          fileType,
        });
        console.log(docRef.id);
      });
    };
};
