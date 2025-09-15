import style from './PostCard.module.css';
import React, { useRef, useState } from 'react';
import { type Post } from '../../types/types.ts';
import { deletePost } from '../../api/deletePost.ts';
import { updatePost } from '../../api/updatePost.ts';
import { useUser } from '../context/UserContext.tsx';
import { usePost } from '../context/PostContext.tsx';
import { useModalAdd } from '../context/ModalAddPostContext.tsx';

interface PostCardProps {
    posts?: Post[],
    loading: boolean,
}

const PostCard: React.FC<PostCardProps> = ({posts, loading}) =>{

    const { refreshUsers } = useUser();
    const { refreshPosts } = usePost();
    const { toggleModal } = useModalAdd();

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const fullTitleRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const [textActive, setTextActive] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        deletePost(id);
        refreshUsers();
    }

    const handleModifyClick = (id: number) => {
        if(textActive === id){
            setTextActive(null);
            return;
        }
        setTextActive(id);
    }

    const handleUpdateClick = (id: number, body: unknown) => {
        updatePost(id, body);
        setTextActive(null);
        refreshPosts();
    }

    const handleTitleEnter = (id: number) => {
        if(fullTitleRefs.current[id]) {
            fullTitleRefs.current[id].style.display = 'flex';
        } 
    }

    const handleTitleLeave = (id: number) => {
        if(fullTitleRefs.current[id]) {
            fullTitleRefs.current[id].style.display = 'none';
        } 
    }

    const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        toggleModal();
    }

    return loading ? (
        <div className={style.postcardOuter}>
            <div className={style.loadingContainer}>
                Loading...
            </div>
        </div>
    ) : (
        <div className={style.postcardOuter}>
            <div className={style.postcardHeader}>
                <div className={style.postCardTitle}>User posts</div>
                <button 
                    className={style.addPostButton}
                    onClick={handleAddClick}>Add post</button>
            </div>
            <div className={style.postcardBody}>
                {posts?.map((post, index) => {
                    return(
                        <div key={index} className={style.postBody}>
                            <div className={style.bodyHeader}>
                                <div className={style.id}>{post.id}<span className={style.idSub}>-post id</span></div>
                                <div 
                                    className={style.title}
                                    onMouseEnter={() => handleTitleEnter(post.id)}
                                    onMouseLeave={() => handleTitleLeave(post.id)}>{post.title.length > 30 ? `${post.title.slice(0, 27)}...` : post.title}
                                    <div 
                                        className={style.fullTitle}
                                        ref={(targetRef: HTMLDivElement | null) => {
                                            (fullTitleRefs.current[post.id] = targetRef)}}>{post.title}</div>
                                </div>
                                <div className={style.userId}>{post.userId}<span className={style.userIdSub}>-user id</span></div>
                            </div>
                            <div className={style.bodyContent}>
                                <div className={style.updateContainer}>
                                    <textarea 
                                        className={`${textActive === post.id ? null : style.disabled}`}
                                        ref={textActive === post.id ? textareaRef : null} 
                                        name="post" 
                                        id={`postArea${post.id}`} 
                                        defaultValue={post.body}></textarea>
                                </div>
                                {post.body}
                            </div>
                            <div className={style.bodyDelete}>
                                <button 
                                    className={`${style.updateButton} ${textActive === post.id ? null : style.disabled}`}
                                    onClick={() => handleUpdateClick(post.id, {id: post.id, title: post.title, body: textareaRef.current?.value, userId: post.userId})}
                                    >Update post</button>
                                <button 
                                    className={`${style.modifyButton}`}
                                    onClick={() => handleModifyClick(post.id)}>{textActive === post.id ? 'Cancel' : 'Modify'}</button>
                                <button 
                                    className={style.deleteButton}
                                    onClick={() => handleDeleteClick(post.id)}>Delete post</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PostCard;
