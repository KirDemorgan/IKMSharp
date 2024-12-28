import { useUserStore } from "../store/userStore";
import React from "react";

interface UsersSelectProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const UsersSelect: React.FC<UsersSelectProps> = ({ value, onChange }) => {
    const { users } = useUserStore();

    return (
        <div>
            <label>User</label>
            <select name="userId" value={value} onChange={onChange}>
                {users.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.username}
                    </option>
                ))}
            </select>
        </div>
    );
};