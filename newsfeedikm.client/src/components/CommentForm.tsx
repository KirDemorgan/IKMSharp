import React, { useState } from "react";

interface CommentFormProps {
    onSave: (content: string) => void;
    onClose?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSave, onClose }) => {
    const [content, setContent] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(content);
    };

    return (
        <div className="comment-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Comment</label>
                    <textarea
                        name="content"
                        value={content}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default CommentForm;