import React, { useState } from "react";
import { createUser } from "../services/api";

interface EditFormProps {
    title: string;
    initialData: any;
    dropdownData?: { value: number; label: string }[];
    onSave: (data: any) => void;
}

const EditForm: React.FC<EditFormProps> = ({ title, initialData, dropdownData, onSave }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser(formData);
            onSave(formData);
        } catch (error) {
            console.error("Error creating user", error);
        }
    };

    return (
        <div className="edit-form">
            <h3>{title}</h3>
            <form onSubmit={handleSubmit}>
                {dropdownData ? (
                    <div>
                        <label>Role</label>
                        <select name="roleId" value={formData.roleId} onChange={handleChange}>
                            {dropdownData.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : null}

                {Object.keys(initialData).map((key) =>
                    key !== "roleId" ? (
                        <div key={key}>
                            <label>{key}</label>
                            <input
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                type={typeof initialData[key] === "number" ? "number" : "text"}
                            />
                        </div>
                    ) : null
                )}
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditForm;