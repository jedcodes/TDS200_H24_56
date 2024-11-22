import { ImageStoreAction, ImageStoreState } from "@/types/type";
import { create } from "zustand";

const useImageStore = create<ImageStoreState & ImageStoreAction>((set) => ({
  imageUrl: "",
  updateImageUrl: (imageUrl) => set({ imageUrl }),
}));

export default useImageStore;
