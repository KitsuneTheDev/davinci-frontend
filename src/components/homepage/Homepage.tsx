import style from './Homepage.module.css';
import React from 'react';
import { useUser } from '../context/userContext.tsx';
import { type User } from '../../types/types.ts';

const Homepage: React.FC = () => {

    const { users, loading } = useUser();

    if(loading) return <p className='loading-text'>Loading...</p>

    return(
        <div className={style.homepageOuter}>
            <div className={style.homepageHeader}>
                <h2>USERS</h2>
            </div>
            <div className={style.homepageBody}>
                {users?.map((user, index) => {
                    return (
                        <div key={index} className={style.userCardContainer}>
                            <div className={style.userCardHeader}>
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
                            <div className={style.userCardBody}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Homepage;