import React, { useEffect, useRef } from 'react';
import style from './ModalAddPost.module.css';
import { useModalAdd } from '../context/ModalAddPostContext';

const ModalAddPost:React.FC = () => {

    const { modalActive, toggleModal, addLoading, post, setPost, handleAddPost } = useModalAdd();

    const modalRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const bodyRef = useRef<HTMLTextAreaElement | null>(null);

    const handleWindowClick = (event: MouseEvent):void => {

        if(modalActive && modalRef.current && !modalRef.current.contains(event.target as Node)){
            toggleModal();
        };

    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if(event.target?.name === "title") {
            setPost(prev => {
                return {...prev, title: event.target?.value}
            });
        } else {
            setPost(prev => {
                return {...prev, body: event.target?.value}
            });
        }
        console.log(post);
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event?.preventDefault();
        console.log(post);
        if(!post?.title || !post?.body) return;
        handleAddPost();
    }

    useEffect(() => {
        window.addEventListener('click', handleWindowClick);

        return () => window.removeEventListener('click', handleWindowClick);
    }, [modalActive])
    
    if(!modalActive) return;

    if(addLoading) return(
        <div className={style.modalOuter} ref={modalRef}>
            <div className={style.loadingContainer}>
                Loading...
            </div>
        </div>
    ); 
    return(
        <div className={style.modalOuter} ref={modalRef}>
            <div className={style.modalHeader}>Add post</div>
            <div className={style.modalBody}>
                <form action="#" className={style.modalForm} onSubmit={handleFormSubmit}>
                    <input 
                        type="text" 
                        name="title"
                        id="postTitle"
                        placeholder='Title here'
                        className={style.formTitleInput}
                        maxLength={40}
                        ref={titleRef}
                        onChange={handleInputChange} />
                    <textarea 
                        name="body"
                        id="postBody"
                        placeholder='Post here'
                        className={style.formBodyInput}
                        maxLength={200}
                        ref={bodyRef}
                        onChange={handleInputChange} />
                    <button type="submit" className={style.formSubmitButton}>Add Post</button>
                </form>
            </div>
        </div>
    );
}

export default ModalAddPost;