import style from './Homepage.module.css';
import React, { useState } from 'react';
import PostCard from '../post/PostCard.tsx';
import { useUser } from '../context/userContext.tsx';
import { usePost } from '../context/postContext.tsx';

const Homepage: React.FC = () => {

    const { users, userLoading } = useUser();
    const { posts, postLoading} = usePost();
    const [activeUserId, setActiveUserId] = useState<number[]>([]);

    const handleCardClick = (userId: number) => {
        setActiveUserId(prev => {
            return prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
        });
    }

    if(userLoading) return (
    <div className={style.homepageOuter}>
        <div className={style.loadingContainer}>
            Loading...
        </div>
    </div>);

    return(
        <div className={style.homepageOuter}>
            <div className={style.homepageHeader}>
                <h2>USERS</h2>
            </div>
            <div className={style.homepageBody}>
                {users?.map((user, index) => {
                    const isActive = activeUserId.includes(user.id);
                    return (
                        <div key={index} className={style.userCardContainer}>
                            <div className={style.userCardHeader} onClick={() => handleCardClick(user.id)}>
                                <div className={style.header}>
                                    <div className={style.subLeft}>
                                        <div className={style.id}>
                                            {user.id}
                                        </div>
                                    </div>
                                    <div className={style.subRight}>
                                        <div className={style.userName}>
                                            {user.username}
                                        </div>
                                        <div className={style.name}>
                                            {user.name}
                                        </div>
                                        <div className={style.email}>
                                            - {user.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${style.userCardBody} ${isActive ? style.active : null}`}>
                                <PostCard posts={posts.filter(post => post.userId === user.id)} loading={postLoading} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Homepage;