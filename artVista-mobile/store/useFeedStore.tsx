import { FeedStoreAction, FeedStoreState } from "@/types/type";
import { create } from "zustand";

const useFeedStore = create<FeedStoreState & FeedStoreAction>((set) => ({
  title: "",
  imageUrl: "",
  description: "",
  category: "",
  hashtags: "",
  updateTitle: (title) => set({ title }),
  updateImageUrl: (imageUrl) => set({ imageUrl }),
  updateDescription: (description) => set({ description }),
  updateCategory: (category) => set({ category }),
  updateHashtags: (hashtags) => set({ hashtags }),
}));

export default useFeedStore;
