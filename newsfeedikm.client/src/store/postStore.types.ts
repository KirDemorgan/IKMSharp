import {Post} from "../types/PostTypes.tsx";

export interface PostStore {
    posts: Post[];
    fetchAllPosts: () => Promise<void>;
    deletePostById: (postId: number) => Promise<void>;
    updatePostById: (postId: number, updatedPost: Post) => Promise<void>;
    createPost: (newPost: Post) => Promise<void>;
    updateComment: (commentId: number, updatedComment: { postId: number, content: string }) => Promise<void>;
    addComment: (postId: number, comment: string) => Promise<void>;
    deleteComment: (commentId: number) => Promise<void>;
    addLike:  (postId: number, authorId: number) => Promise<void>;
    deleteLike: (likeId: number) => Promise<void>;
    toggleLike: (likeId: number, postId : number, currentType: string, authorId: number ) => Promise<void>;
    updateLike: (likeId: number, updatedLike: { postId: number, type: string}) => Promise<void>;
}