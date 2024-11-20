import { Comment, Post, PostStoreState } from "@/types/type";
import { create } from "zustand";

// Her tar jef i bruk Zustand for å håndtere State til postene i appen.
// Jeg oppretter en ny State kalt PostStoreState som inneholder en liste over poster,
// en funksjon for å lage en ny post, en funksjon for å slette en post, en funksjon for å sette alle postene,
// og en funksjon for å legge til en kommentar til en post.
const usePostStore = create<PostStoreState>((set) => ({
  posts: [],
  comments: [],

  setPosts: (posts: Post[]) => set({ posts }),

  addPost: (newPost: Post) =>
    set((state) => ({ posts: [...state.posts, newPost] })),

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

  setComments: (comments: Comment[]) => set({ comments }),

  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),

  deleteComment: (commentId) => {
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== commentId),
    }));
  },
}));

export default usePostStore;
