import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchPost } from '../../api/fetchPost.ts';
import { type Post } from '../../types/types.ts';

type PostContextType = {
    posts: Post[],
    postLoading: boolean,
    refreshPosts: VoidFunction,
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children } : { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [postLoading, setPostLoading] = useState<boolean>(false);

    useEffect(() => {
        refreshPosts();
    }, [])

    const refreshPosts = async () => {
        setPostLoading(true);
        try{
            const newPosts = await fetchPost();
            setPosts(newPosts);
        } catch(error){
            setPosts([]);
        } finally {
            setPostLoading(false);
        }
    }
    
    console.log("new posts -->", posts);
    
    return(
        <PostContext.Provider value={{posts, postLoading, refreshPosts}}>
            {children}
        </PostContext.Provider>
    );
}

export const usePost = () => {
    const context = useContext(PostContext);
    if(!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}