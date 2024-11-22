import { Comment, Post, PostStoreAction, PostStoreState } from "@/types/type";
import { create } from "zustand";

// Her tar jef i bruk Zustand for å håndtere State til postene i appen.
// Jeg oppretter en ny State kalt PostStoreState som inneholder en liste over poster,
// en funksjon for å lage en ny post, en funksjon for å slette en post, en funksjon for å sette alle postene,
// og en funksjon for å legge til en kommentar til en post.
const usePostStore = create<PostStoreState & PostStoreAction>((set) => ({
  posts: [],
  comments: [],

  setPosts: (posts: Post[]) => set({ posts }),

  // Denne funksjonen legger til en ny post. Så for hver gang en ny post blir lagt til, blir den lagt til i posts arrayet. Og dette skjer ved at funksjonen addPost blir kalt, og tar alle postene som er lagret i posts arrayet og kopierer dem til et nytt array og legger til den nye posten med hjelp av JS spread operator(...).
  addPost: (newPost: Post) =>
    set((state) => ({ posts: [...state.posts, newPost] })),

  // Denne funksjonen legger til en kommentar til en post. Så for hver gang en ny kommentar blir lagt til, blir den lagt til i comments arrayet. Og dette skjer ved at funksjonen addComment blir kalt, og tar alle kommentarene som er lagret i comments arrayet og kopierer dem til et nytt array og legger til den nye kommentaren med hjelp av JS spread operator(...).
  addComment: (postId: string, comment: Comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      }),
    })),
  // Denne funksjonen sletter en post. Så for hver gang en post blir slettet, blir den fjernet fra posts arrayet. Og dette skjer ved at funksjonen deletePost blir kalt, og tar alle postene som er lagret i posts arrayet og filtrerer ut posten som skal slettes.
  deletePost: (postId: string) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
}));

export default usePostStore;
