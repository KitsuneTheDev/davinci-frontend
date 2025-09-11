import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchUsers } from '../../api/fetchUser';
import { type User } from '../../types/types.ts';

type UserContextType = {
    users: User[],
    loading: boolean,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children } : { children: React.ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        refreshUsers();
    }, [])

    const refreshUsers = async () => {
        setLoading(true);
        try{
            const newUsers = await fetchUsers();
            setUsers(newUsers);
        } catch(error){
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }
    
    console.log("new users -->", users);
    
    return(
        <UserContext.Provider value={{users, loading}}>
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