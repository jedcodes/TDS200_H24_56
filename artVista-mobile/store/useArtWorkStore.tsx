import { create } from "zustand";

type State = {
  imageUrl: string | null;
  description: string;
  category: string;
  hashtags: string;
  progress: number;
};

type Action = {
  updateImageUrl: (imageUrl: State["imageUrl"]) => void;
  updateDescription: (description: State["description"]) => void;
  updateCategory: (category: State["category"]) => void;
  updateHashtags: (hashtags: State["hashtags"]) => void;
  updateProgress: (progress: State["progress"]) => void;
};

const useArtWorkStore = create<State & Action>((set) => ({
  imageUrl: "",
  description: "",
  category: "",
  hashtags: "",
  progress: 0,
  updateImageUrl: (imageUrl) => set({ imageUrl }),
  updateDescription: (description) => set({ description }),
  updateCategory: (category) => set({ category }),
  updateHashtags: (hashtags) => set({ hashtags }),
  updateProgress: (progress) => set({ progress }),
}));

export default useArtWorkStore;
