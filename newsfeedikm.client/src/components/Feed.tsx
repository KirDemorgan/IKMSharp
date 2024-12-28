import React from "react";
// @ts-ignore
import { usePostStore } from "../store/PostStore";
import PostComponent from "./Post";
import {Post} from "../types/PostTypes.tsx";

const Feed: React.FC = () => {
    const { posts, deletePostById, updatePostById } = usePostStore();

    return (
        <div>
            {posts.map((post: Post) => (
                <PostComponent
                    key={post.postId}
                    post={post}
                    onDelete={deletePostById}
                    onUpdate={updatePostById}
                />
            ))}
        </div>
    );
};

export default Feed;