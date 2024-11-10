import { ArtworkAction, ArtworkState } from "@/types/type";
import { create } from "zustand";

const useArtWorkStore = create<ArtworkState & ArtworkAction>((set) => ({
  title: "",
  imageUrl: "",
  description: "",
  category: "",
  hashtags: "",
  isUploading: false,
  updateTitle: (title) => set({ title }),
  updateImageUrl: (imageUrl) => set({ imageUrl }),
  updateDescription: (description) => set({ description }),
  updateCategory: (category) => set({ category }),
  updateHashtags: (hashtags) => set({ hashtags }),
  updateIsUploading: (isUploading) => set({ isUploading }),
}));

export default useArtWorkStore;
