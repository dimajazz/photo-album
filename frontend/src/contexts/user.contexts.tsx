import { useState, createContext, useContext, useEffect } from 'react';

import {
    setToLocalStorageWithExpiry,
    removeFromLocalStorage,
} from 'servises/localStorageHandler';
import { UserDataType } from 'types/types';

export const initialAuthData: AuthContextProps = {
    userData: null,
    setUserHandler: () => { },
};

const AuthContext = createContext<AuthContextProps>(initialAuthData);

export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;
    const [userData, setUserData] = useState<User>(null);

    const setUserHandler = (user: User) => {
        setUserData(user);
    };

    useEffect(() => {
        userData
            ? setToLocalStorageWithExpiry({ value: userData })
            : removeFromLocalStorage();
    }, [userData]);

    return (
        <AuthContext.Provider value={{ userData, setUserHandler }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

type AuthProviderProps = { children: JSX.Element };

type User = UserDataType | null;

type AuthContextProps = {
    userData: User;
    setUserHandler: (user: User) => void;
};
