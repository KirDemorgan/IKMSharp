import React from "react";
// @ts-ignore
import { usePostStore } from "../store/PostStore";
import PostComponent from "./Post";
import {Post} from "../types/PostTypes.tsx";

const Feed: React.FC = () => {
    const { posts } = usePostStore();

    return (
        <div>
            {posts.map((post: Post) => (
                <PostComponent
                    key={post.postId}
                    post={post}
                />
            ))}
        </div>
    );
};

export default Feed;