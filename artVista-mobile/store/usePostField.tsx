import { FeedStoreAction, FeedStoreState } from "@/types/type";
import { create } from "zustand";

const usePostField = create<FeedStoreState & FeedStoreAction>((set) => ({
  imageUrl: "",
  updateImageUrl: (imageUrl) => set({ imageUrl }),
}));

export default usePostField;
