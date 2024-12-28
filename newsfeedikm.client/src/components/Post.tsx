import React from "react";
import { Post } from "../types/PostTypes";
import Comments from "./Comments";
import Likes from "./Likes";

interface PostProps {
    post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
    return (
        <div className="post">
            <h2>{post.content}</h2>
            <p>
                <strong>Author:</strong> {post.username}
            </p>
            <p>
                <strong>Posted:</strong> {new Date(post.createdAt).toLocaleString()}
            </p>
            <Likes likes={post.likes.$values} />
            <Comments comments={post.comments.$values} />
        </div>
    );
};

export default PostComponent;
