import { storageRef } from "@/lib/firebase";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";

export const useUpload = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const uploadMedia = async () => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const mediaStoreRef = storageRef(`${path}/${new Date().getTime()}`);

    const upload = uploadBytesResumable(mediaStoreRef, blob);

    upload.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        const downloadedUrl = await getDownloadURL(mediaStoreRef);
        setUrl(downloadedUrl);
      }
    );
  };

  return { url, error, progress, uploadMedia };
};
