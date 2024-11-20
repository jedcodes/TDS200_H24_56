import { Post, ProfileStoreState } from "@/types/type";
import { create } from "zustand";

const useProfileStore = create<ProfileStoreState>((set) => ({
  profilePosts: [],

  setProfilePosts: (post: Post[]) => set({ profilePosts: post }),

  addPost: (post: Post) =>
    set((state) => ({ profilePosts: [...state.profilePosts, post] })),

  deletePost: (postId: string) =>
    set((state) => ({
      profilePosts: state.profilePosts.filter((post) => post.id !== postId),
    })),
}));

export default useProfileStore;
