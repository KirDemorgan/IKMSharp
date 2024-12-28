import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Post } from "../types/PostTypes";
import PostComponent from "./Post";

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        api
            .get<{ $values: Post[] }>("/Posts/flattened-feed")
            .then((response) => setPosts(response.data.$values))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="feed">
            {posts.length > 0 ? (
                posts.map((post) => <PostComponent key={post.postId} post={post} />)
            ) : (
                <p>Loading posts...</p>
            )}
        </div>
    );
};

export default Feed;
