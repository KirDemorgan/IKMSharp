import React, { useState } from "react";
import { Post } from "../types/PostTypes";
import Likes from "./Likes";
import { PostEditForm } from "./PostEditForm";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { UsersSelect } from "./UsersSelect";
// @ts-ignore
import { usePostStore } from "../store/postStore";

interface PostProps {
    post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
    const { deletePostById, updatePostById, addComment, addLike, deleteLike, toggleLike, fetchAllPosts } = usePostStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingComment, setIsAddingComment] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState<number | null>(null);

    const handleDelete = async () => {
        try {
            await deletePostById(post.postId);
        } catch (error) {
            console.error("Error deleting post", error);
        }
    };

    const handleUpdate = async (updatedPost: Post) => {
        try {
            await updatePostById(post.postId, updatedPost);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating post", error);
        }
    };

    const handleAddComment = async (content: string) => {
        try {
            await addComment(post.postId, content);
            setIsAddingComment(false);
        } catch (error) {
            console.error("Error adding comment", error);
        }
    };

    const handleAddLike = async () => {
        if (selectedAuthor) {
            try {
                await addLike(post.postId, selectedAuthor);
            } catch (error) {
                console.error("Error adding like", error);
            }
        }
    };

    const handleDeleteLike = async (likeId: number) => {
        try {
            await deleteLike(likeId);
        } catch (error) {
            console.error("Error deleting like", error);
        }
    };

    const handleToggleLike = async (likeId: number, currentType: string, authorId: number) => {
        try {
            console.log(likeId)
            await toggleLike(likeId, post.postId, currentType, authorId);
            await fetchAllPosts()
        } catch (error) {
            console.error("Error toggling like", error);
        }
    };

    return (
        <div className="post">
            <h2>{post.content}</h2>
            <p>
                <strong>Author:</strong> {post.username}
            </p>
            <p>
                <strong>Posted:</strong> {new Date(post.createdAt).toLocaleString()}
            </p>
            <Likes likes={post.likes.$values} onDeleteLike={handleDeleteLike} onToggleLike={handleToggleLike} />
            <div className="comments">
                {post.comments.$values.map((comment: any) => (
                    <Comment key={comment.commentId} comment={comment} postId={post.postId} />
                ))}
            </div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setIsEditing(!isEditing)}>Update</button>
            <button onClick={() => setIsAddingComment(!isAddingComment)}>Add Comment</button>
            <UsersSelect
                value={selectedAuthor || 0}
                onChange={(e) => setSelectedAuthor(Number(e.target.value))}
            />
            <button onClick={handleAddLike}>Like</button>

            {isAddingComment && (
                <CommentForm
                    onSave={handleAddComment}
                    onClose={() => setIsAddingComment(false)}
                />
            )}
            {isEditing && (
                <PostEditForm
                    post={post}
                    onSave={handleUpdate}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default PostComponent;