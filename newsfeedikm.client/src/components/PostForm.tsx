import React, { useState } from "react";
import {UsersSelect} from "./UsersSelect.tsx";

interface PostFormProps {
    initialData: any;
    dropdownData: { value: number; label: string }[];
    onSave: (data: any) => void;
    onClose: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialData, onSave, onClose }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
                <h2>Add New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        />
                    </div>
                    <UsersSelect
                        value={formData.userId}
                        onChange={handleChange}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default PostForm;