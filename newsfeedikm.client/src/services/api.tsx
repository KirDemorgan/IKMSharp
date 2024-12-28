import axios from "axios";
import {Post} from "../types/PostTypes.tsx";

export const api = axios.create({
    baseURL: "http://localhost:5232/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Comments API
export const fetchComments = () => api.get("/Comments");
export const createComment = (data: any) => api.post("/Comments", data);
export const updateComment = (id: number, data: any) => api.put(`/Comments/${id}`, data);
export const deleteComment = (id: number) => api.delete(`/Comments/${id}`);

fetchComments()

// Likes API
export const fetchLikes = () => api.get("/Likes");
export const createLike = (data: any) => api.post("/Likes", data);
export const updateLike = (id: number, data: any) => api.put(`/Likes/${id}`, data);
export const deleteLike = (id: number) => api.delete(`/Likes/${id}`);

fetchLikes()

// Posts API
export const fetchPosts = () => api.get("/Posts/flattened-feed");
export const createPost = (data: Post) => api.post("/Posts", data);
export const updatePost = (id: number, data: any) => api.put(`/Posts/${id}`, data);
export const deletePost = (id: number) => api.delete(`/Posts/${id}`);

// Roles API
export const fetchRoles = () => api.get("/Roles");
export const createRole = (data: any) => api.post("/Roles", data);
export const updateRole = (id: number, data: any) => api.put(`/Roles/${id}`, data);
export const deleteRole = (id: number) => api.delete(`/Roles/${id}`);

fetchRoles()

// Users API
export const fetchUsers = () => api.get("/Users");
export const createUser = (data: any) => api.post("/Users", data);
export const updateUser = (id: number, data: any) => api.put(`/Users/${id}`, data);
export const deleteUser = (id: number) => api.delete(`/Users/${id}`);
