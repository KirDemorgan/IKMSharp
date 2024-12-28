import React, { useState } from "react";
// @ts-ignore
import { usePostStore } from "../store/postStore";

interface CommentProps {
    comment: any;
    postId: number;
}

const Comment: React.FC<CommentProps> = ({ comment, postId }) => {
    const { deleteComment, updateComment, fetchAllPosts } = usePostStore();
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(comment.content);

    const handleDelete = async () => {
        try {
            await deleteComment(comment.commentId);
        } catch (error) {
            console.error("Error deleting comment", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await updateComment(comment.commentId, { postId, content });
            setIsEditing(false);
            await fetchAllPosts()
        } catch (error) {
            console.error("Error updating comment", error);
        }
    };

    return (
        <div className="comment">
            {isEditing ? (
                <div>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{comment.content}</p>
                    <button onClick={() => setIsEditing(true)}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default Comment;