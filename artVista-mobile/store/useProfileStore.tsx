import { Post, ProfileStoreState } from "@/types/type";
import { create } from "zustand";

// Dette er en Zustand store for å håndtere brukerens profilinnlegg. Denne butikken holder styr på brukerens profilinnlegg og gir funksjoner for å legge til og slette innlegg.
const useProfileStore = create<ProfileStoreState>((set) => ({
  // Alle innlegg som er lagt til i brukerens profil. Og jeg bruker profilesPosts arraet for å lagre og vise brukerens profilinnlegg.
  profilePosts: [],

  setProfilePosts: (post: Post[]) => set({ profilePosts: post }),

  // Denne funksjonen legger til et innlegg i brukerens profil. Så for hver gang et nytt innlegg blir lagret, blir det lagt til i profilePosts arrayet. Og detter skjer ved at funksjoen addPost blir kalt, og tar alle innlegene som er lagret i profilePost arrayet og kopierer dem til et nytt array og legger til det nye innlegget med hjelp av JS spread operator(...).
  addPost: (post: Post) =>
    set((state) => ({ profilePosts: [...state.profilePosts, post] })),

  // Denne funksjonen sletter et innlegg fra brukerens profil. Så for hver gang et innlegg blir slettet, blir det fjernet fra profilePosts arrayet. Og dette skjer ved at funksjonen deletePost blir kalt, og tar alle innlegene som er lagret i profilePosts arrayet og filtrerer ut innlegget som skal
  deletePost: (postId: string) =>
    set((state) => ({
      profilePosts: state.profilePosts.filter((post) => post.id !== postId),
    })),
}));

export default useProfileStore;
