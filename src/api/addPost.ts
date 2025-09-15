import { ApiClient } from "./apiClient.ts";
import { type Post } from "../types/types.ts";

const api = new ApiClient('https://jsonplaceholder.typicode.com/');

// ADD POSTS
export const addPost = async (body: unknown): Promise<Post[]> => {
    const data: Post[] = await api.post<Post[]>(`posts/`, body);
    return data;
};