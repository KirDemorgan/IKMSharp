import React from "react";
import { Comment } from "../types/PostTypes";

interface CommentsProps {
    comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
    return (
        <div className="comments">
            <h4>Comments:</h4>
            {comments.map((comment) => (
                <p key={comment.commentId}>
                    <strong>{comment.content}</strong> -{" "}
                    {new Date(comment.createdAt).toLocaleString()}
                </p>
            ))}
        </div>
    );
};

export default Comments;
