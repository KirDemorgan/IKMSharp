import React, { useState, useEffect } from "react";
import {Role, useUserStore} from "../store/userStore";

export const RoleManager: React.FC = () => {
    const { roles, fetchAllRoles, addRole, updateRole, deleteRole } = useUserStore();
    const [newRole, setNewRole] = useState<string>("");
    const [editRole, setEditRole] = useState<{ roleId: number; roleName: string } | null>(null);

    useEffect(() => {
        fetchAllRoles();
    }, [fetchAllRoles]);

    const handleCreateRole = async () => {
        await addRole(newRole);
        setNewRole("");
    };

    const handleUpdateRole = async () => {
        if (editRole) {
            await updateRole(editRole.roleId, editRole.roleName);
            await fetchAllRoles();
            setEditRole(null);
        }
    };

    const handleDeleteRole = async (id: number) => {
        await deleteRole(id);
        await fetchAllRoles();
    };

    return (
        <div>
            <h2>Role Manager</h2>
            <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="New Role"
            />
            <button onClick={handleCreateRole}>Create Role</button>
            <ul>
                {Array.isArray(roles.$values) && roles.$values.map((role: Role) => (
                    <li key={role.roleId}>
                        {editRole && editRole.roleId === role.roleId ? (
                            <input
                                type="text"
                                value={editRole.roleName}
                                onChange={(e) => setEditRole({ ...editRole, roleName: e.target.value })}
                            />
                        ) : (
                            `Id ${role.roleId}  name ${role.roleName} `
                        )}
                        <button onClick={() => setEditRole(role)}>Edit</button>
                        <button onClick={() => handleDeleteRole(role.roleId)}>Delete</button>
                    </li>
                ))}
            </ul>
            {editRole && (
                <div>
                    <button onClick={handleUpdateRole}>Save</button>
                    <button onClick={() => setEditRole(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};