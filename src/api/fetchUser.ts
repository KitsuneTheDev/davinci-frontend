import { ApiClient } from "./apiClient.ts";
import { type User } from "../types/types.ts";

const api = new ApiClient('https://jsonplaceholder.typicode.com/');

// GET USERS
export const fetchUsers = async (): Promise<User[]> => {
    const data: User[] = await api.get<User[]>('users');
    return data;
};

