import React from "react";

interface LikesProps {
    likes: any[];
    onDeleteLike: (likeId: number) => void;
    onToggleLike: (likeId: number, currentType: string, authorId: number) => void;
}

const Likes: React.FC<LikesProps> = ({ likes, onDeleteLike, onToggleLike }) => {
    console.log(likes)
    return (
        <div className="likes">
            {likes.map((like) => (
                <div key={like.likeId} className="like">
                    <button onClick={() => onToggleLike(like.likeId, like.type, like.authorId)}>
                        {like.type === "Like" ? "Dislike" : "Like"}
                    </button>
                    <button onClick={() => onDeleteLike(like.likeId)}>Delete</button>
                    <span>{like.authorName}</span>
                </div>
            ))}
        </div>
    );
};

export default Likes;