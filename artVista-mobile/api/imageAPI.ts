import { uploadBytesResumable } from "firebase/storage";
import { storageRef } from "@/lib/firebase";

export const uploadImage = async (url: string) => {
  const fetchResponse = await fetch(url);
  const blob = await fetchResponse.blob();

  const imagePath = url.split("/").pop()?.split(".")[0] ?? "anonymtBilde";
  console.log("imagepath", imagePath);

  const uploadPath = `images/${imagePath}`;

  const imageRef = storageRef(uploadPath);

  try {
    console.log("pls");
    await uploadBytesResumable(imageRef, blob);
    console.log("Uploading image to", uploadPath);
    return uploadPath;
  } catch (e) {
    console.error("error uploading image", e);
    return "ERROR";
  }
};
