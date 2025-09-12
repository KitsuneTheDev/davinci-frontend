import { ApiClient } from "./apiClient.ts";
import { type Post } from "../types/types.ts";

const api = new ApiClient('https://jsonplaceholder.typicode.com/');

// GET POSTS
export const fetchPost = async (): Promise<Post[]> => {
    const data: Post[] = await api.get<Post[]>('posts');
    return data;
};

