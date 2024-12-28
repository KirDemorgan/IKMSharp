import {create } from "zustand";
import {
    fetchPosts,
    deletePost,
    updatePost,
    createPost,
    createComment,
    updateComment,
    deleteComment, updateLike, deleteLike, createLike
} from "../services/api";
import { Post } from "../types/PostTypes";
import {PostStore} from "./postStore.types.ts";

export const usePostStore = create<PostStore>((set: any) => ({
    posts: [],
    fetchAllPosts: async () => {
        try {
            const response = await fetchPosts();
            set({ posts: response.data.$values });
        } catch (error) {
            console.error("Error fetching posts", error);
        }
    },
    deletePostById: async (postId: number) => {
        try {
            await deletePost(postId);
            set((state: any) => ({
                posts: state.posts.filter((post: Post) => post.postId !== postId)
            }));
        } catch (error) {
            console.error("Error deleting post", error);
        }
    },
    updatePostById: async (postId: number, updatedPost: Post) => {
        try {
            await updatePost(postId, updatedPost);
            set((state: any) => ({
                posts: state.posts.map((post: Post)=> (post.postId === postId ? updatedPost : post))
            }));
        } catch (error) {
            console.error("Error updating post", error);
        }
    },
    createPost: async (newPost: Post) => {
        try {
            const response = await createPost(newPost);
            set((state: any) => ({
                posts: [...state.posts, response.data]
            }));
        } catch (error) {
            console.error("Error creating post", error);
        }
    },
    updateComment: async (commentId: number, updatedComment: { postId: number, content: string }) => {
        try {
            const response = await updateComment(commentId, updatedComment);
            const updatedCommentData = response.data;
            set((state:any) => ({
                posts: state.posts.map((post: Post) => {
                    if (post.postId === updatedComment.postId) {
                        return {
                            ...post,
                            comments: {
                                $values: post.comments.$values.map((comment) =>
                                    comment.commentId === commentId ? updatedCommentData : comment
                                )
                            }
                        };
                    }
                    return post;
                })
            }));
        } catch (error) {
            console.error("Error updating comment", error);
        }
    },
    addComment: async  (postId: number, comment: string) => {
        try {
            const response = await createComment({ postId, content: comment });
            const newComment = response.data;
            set((state: any) => ({
                posts: state.posts.map((post: Post) => {
                    if (post.postId === postId) {
                        return {
                            ...post,
                            comments: {
                                $values: [...post.comments.$values, newComment]
                            }
                        };
                    }
                    return post;
                })
            }));
        } catch (error) {
            console.error("Error adding comment", error);
        }
    },
    deleteComment: async (commentId: number) => {
        try {
            await deleteComment(commentId);
            set((state: any) => ({
                posts: state.posts.map((post: Post) => ({
                    ...post,
                    comments: {
                        $values: post.comments.$values.filter((comment) => comment.commentId !== commentId)
                    }
                }))
            }));
        } catch (error) {
            console.error("Error deleting comment", error);
        }
    },
    addLike: async (postId: number, authorId: number) => {
        try {
            const response = await createLike({ postId, type: "Like", authorId });
            const newLike = response.data;
            set((state: any) => ({
                posts: state.posts.map((post: Post) => {
                    if (post.postId === postId) {
                        return {
                            ...post,
                            likes: {
                                $values: [...post.likes.$values, newLike]
                            }
                        };
                    }
                    return post;
                })
            }));
        } catch (error) {
            console.error("Error adding like", error);
        }
    },
    updateLike: async (likeId: number, updatedLike: { postId: number, type: string }) => {
        try {
            const response = await updateLike(likeId, updatedLike);
            const updatedLikeData = response.data;
            set((state: any) => ({
                posts: state.posts.map((post: Post) => {
                    if (post.postId === updatedLike.postId) {
                        return {
                            ...post,
                            likes: {
                                $values: post.likes.$values.map((like) =>
                                    like.likeId === likeId ? updatedLikeData : like
                                )
                            }
                        };
                    }
                    return post;
                })
            }));
        } catch (error) {
            console.error("Error updating like", error);
        }
    },
    deleteLike: async (likeId: number) => {
        try {
            await deleteLike(likeId);
            set((state: any) => ({
                posts: state.posts.map((post: Post) => ({
                    ...post,
                    likes: {
                        $values: post.likes.$values.filter((like) => like.likeId !== likeId)
                    }
                }))
            }));
        } catch (error) {
            console.error("Error deleting like", error);
        }
    },
    toggleLike: async (likeId: number, postId: number, currentType: string, authorId: number) => {
        try {
            const newType = currentType === "Like" ? "Dislike" : "Like";
            const response = await updateLike(likeId, { postId, type: newType, authorId });
            const updatedLikeData = response.data;
            set((state: any) => ({
                posts: state.posts.map((post: Post) => {
                    if (post.postId === postId) {
                        return {
                            ...post,
                            likes: {
                                $values: post.likes.$values.map((like) =>
                                    like.likeId === likeId ? updatedLikeData : like
                                )
                            }
                        };
                    }
                    return post;
                })
            }));
        } catch (error) {
            console.error("Error toggling like", error);
        }

    }
}));