import { create } from "zustand";
import { fetchUsers, createUser, fetchRoles, createRole, updateRole, deleteRole, updateUser, deleteUser } from "../services/api";

interface User {
    id: number;
    surname: string;
    username: string;
    email: string;
    password: string;
    roleId: number;
}

export interface Role {
    roleId: number;
    roleName: string;
    users: {
        $id: string;
        $values: any[];
    };
}

export interface Roles {
    $id: string;
    $values: Role[];
}

interface UserStore {
    users: User[];
    roles: Roles;
    fetchAllUsers: () => Promise<void>;
    addUser: (data: User) => Promise<void>;
    updateUser: (id: number, data: Partial<User>) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
    fetchAllRoles: () => Promise<void>;
    addRole: (newRoleName: string) => Promise<void>;
    updateRole: (id: number, roleName: string) => Promise<void>;
    deleteRole: (id: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    roles: {
        $id: '',
        $values: []
    },
    fetchAllUsers: async () => {
        try {
            const response = await fetchUsers();
            set({ users: response.data.$values });
        } catch (error) {
            console.error("Error fetching users", error);
        }
    },
    addUser: async (data: User) => {
        try {
            await createUser(data);
            set((state) => ({
                users: [...state.users, data]
            }));
        } catch (error) {
            console.error("Error creating user", error);
        }
    },
    updateUser: async (id: number, data: Partial<User>) => {
        try {
            const response = await updateUser(id, data);
            set((state) => ({
                users: state.users.map(user => user.id === id ? response.data : user)
            }));
        } catch (error) {
            console.error("Error updating user", error);
        }
    },
    deleteUser: async (id: number) => {
        try {
            await deleteUser(id);
            set((state) => ({
                users: state.users.filter(user => user.id !== id)
            }));
        } catch (error) {
            console.error("Error deleting user", error);
        }
    },
    fetchAllRoles: async () => {
        try {
            const response = await fetchRoles();
            set({ roles: response.data });
        } catch (error) {
            console.error("Error fetching roles", error);
        }
    },
    addRole: async (newRoleName: string) => {
        try {
            const response = await createRole({ roleName: newRoleName });
            set((state) => ({
                roles: {
                    ...state.roles,
                    $values: [...state.roles.$values, response.data]
                }
            }));
        } catch (error) {
            console.error("Error creating role", error);
        }
    },
    updateRole: async (id: number, roleName: string) => {
        try {
            const response = await updateRole(id, { roleName });
            set((state) => ({
                roles: {
                    ...state.roles,
                    $values: state.roles.$values.map(role => role.roleId === id ? response.data : role)
                }
            }));
        } catch (error) {
            console.error("Error updating role", error);
        }
    },
    deleteRole: async (id: number) => {
        try {
            await deleteRole(id);
            set((state) => ({
                roles: {
                    ...state.roles,
                    $values: state.roles.$values.filter(role => role.roleId !== id)
                }
            }));
        } catch (error) {
            console.error("Error deleting role", error);
        }
    }
}));