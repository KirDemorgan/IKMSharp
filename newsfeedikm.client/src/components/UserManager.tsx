import React, { useState, useEffect } from "react";
import { useUserStore } from "../store/userStore";

export const UserManager: React.FC = () => {
    const { users, fetchAllUsers, updateUser, deleteUser } = useUserStore();
    const [editUser, setEditUser] = useState<{ id: number; username: string } | null>(null);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const handleUpdateUser = async () => {
        if (editUser) {
            await updateUser(editUser.id, {
                ...editUser,
                username: editUser.username });
            setEditUser(null);
            await fetchAllUsers()
        }
    };

    const handleDeleteUser = async (id: number) => {
        await deleteUser(id);
    };

    return (
        <div>
            <h2>User Manager</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {editUser && editUser.id === user.id ? (
                            <input
                                type="text"
                                value={editUser.username}
                                onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                            />
                        ) : (
                            user.username
                        )}
                        <button onClick={() => setEditUser(user)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {editUser && (
                <div>
                    <button onClick={handleUpdateUser}>Save</button>
                    <button onClick={() => setEditUser(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};