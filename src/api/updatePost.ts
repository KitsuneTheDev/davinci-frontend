import { ApiClient } from "./apiClient.ts";
import { type Post } from "../types/types.ts";

const api = new ApiClient('https://jsonplaceholder.typicode.com/');

// UPDATE POSTS
export const updatePost = async (id: number, body: unknown): Promise<Post[]> => {
    const data: Post[] = await api.put<Post[]>(`posts/${id}`, body);
    return data;
};