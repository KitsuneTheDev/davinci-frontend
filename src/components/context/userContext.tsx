import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchUsers } from '../../api/fetchUser.ts';
import { type User } from '../../types/types.ts';

type UserContextType = {
    users: User[] | null,
    userLoading: boolean,
    refreshUsers: VoidFunction,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children } : { children: React.ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [userLoading, setUserLoading] = useState<boolean>(false);

    useEffect(() => {
        refreshUsers();
    }, [])

    const refreshUsers = async () => {
        setUserLoading(true);
        try{
            const newUsers = await fetchUsers();
            setUsers(newUsers);
        } catch(error){
            setUsers([]);
        } finally {
            setUserLoading(false);
        }
    }
    
    console.log("new users -->", users);
    
    return(
        <UserContext.Provider value={{users, userLoading, refreshUsers}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}