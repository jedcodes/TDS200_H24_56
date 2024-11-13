import { ProfileStoreState } from "@/types/type";
import { create } from "zustand";

// const useProfileStore = create<ProfileStoreState>((set) => ({
//     artisitProfile: null,
//     setProfile: (artisitProfile) => set({ artisitProfile }),
//     addPost: (post) => set((state) => {
//         if (state.artisitProfile) {
//             state.artisitProfile.posts.push(post);
//         }
//     }),
// }))
