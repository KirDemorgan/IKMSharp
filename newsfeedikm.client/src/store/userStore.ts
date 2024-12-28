import { create } from "zustand";
import { fetchUsers, createUser } from "../services/api";

interface User {
    id: number;
    surname: string;
    username: string;
    email: string;
    password: string;
    roleId: number;
}

interface UserStore {
    users: User[];
    fetchAllUsers: () => Promise<void>;
    addUser: (data: any) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
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
    }
}));