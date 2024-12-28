import React from "react";
import { Like } from "../types/PostTypes";

interface LikesProps {
    likes: Like[];
}

const Likes: React.FC<LikesProps> = ({ likes }) => {
    return (
        <div className="likes">
            <h4>Likes:</h4>
            {likes.length > 0 ? (
                likes.map((like) => (
                    <p key={like.likeId}>
                        {like.type}: {like.authorUsername}
                    </p>
                ))
            ) : (
                <p>No likes yet.</p>
            )}
        </div>
    );
};

export default Likes;
