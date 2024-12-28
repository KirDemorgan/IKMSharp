import React, { useState } from "react";
import { Post } from "../types/PostTypes";

interface PostEditFormProps {
    post: Post;
    onSave: (updatedPost: Post) => void;
    onClose: () => void;
}

export const PostEditForm: React.FC<PostEditFormProps> = ({ post, onSave, onClose }) => {
    const [formData, setFormData] = useState(post);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};
