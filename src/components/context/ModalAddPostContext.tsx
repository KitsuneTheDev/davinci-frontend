import { type Post } from "../../types/types.ts"
import React, { createContext, useContext, useState } from 'react';
import { addPost } from "../../api/addPost.ts";
import { usePost } from "./PostContext.tsx";

interface modalAddPostContextType {
    post?: Post,
    postLoading: boolean,
    modalActive: boolean,
    toggleModal: VoidFunction,
    addLoading: boolean,
    handleAddPost: () => Promise<void>,
    setPost: React.Dispatch<React.SetStateAction<Post>>,
}

export const ModalAddPostContext = createContext<modalAddPostContextType | undefined>(undefined);

export const ModalAddPostProvider = ({children}: {children: React.ReactNode}) => {

    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const { postLoading, refreshPosts } = usePost();
    const [post, setPost] = useState<Post>({
        id: -1,
        userId: -1,
        title: "",
        body: "",
    });

    const toggleModal = (): void => {
        setModalActive(prev => !prev);
    }

    const handleAddPost: () => Promise<void> = async () => {
        setAddLoading(true);
        try {
            addPost(post);
            toggleModal();
        } catch(error) {
            console.error("Error: ", error);
            setPost({
                id: -1,
                userId: -1,
                title: "",
                body: "",
            });
        } finally {
            setAddLoading(false);
            refreshPosts();
        }
    }

    return(
        <ModalAddPostContext.Provider value={{post, postLoading, modalActive, toggleModal, addLoading, setPost, handleAddPost}}>
            {children}
        </ModalAddPostContext.Provider>
    );
}

export const useModalAdd = () => {
    const context = useContext(ModalAddPostContext);
    if(!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}