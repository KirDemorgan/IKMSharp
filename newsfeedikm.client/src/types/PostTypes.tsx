export interface Comment {
    commentId: number;
    content: string;
    createdAt: string;
}

export interface Like {
    likeId: number;
    authorId: number;
    authorUsername: string;
    type: string;
}

export interface Post {
    postId: number;
    content: string;
    createdAt: string;
    userId: number;
    username: string;
    comments: { $values: Comment[] };
    likes: { $values: Like[] };
}
