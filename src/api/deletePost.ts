import { ApiClient } from "./apiClient.ts";
import { type Post } from "../types/types.ts";

const api = new ApiClient('https://jsonplaceholder.typicode.com/');

// DELETE POSTS
export const deletePost = async (id: number): Promise<Post[]> => {
    const data: Post[] = await api.delete<Post[]>(`posts/${id}`);
    return data;
};