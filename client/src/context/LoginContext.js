import { createContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export const LoginContext = createContext();

async function getValueOf(key, value) {
    const result = await SecureStore.getItemAsync(key);
    return result;
}


export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function loginAction(key, value) {
        try {
            await SecureStore.setItemAsync(key, value);
            setIsLoggedIn(true);
        } catch (err) {
            console.log(err);
        }
    }

    async function logoutAction(key) {
        try {
            await SecureStore.deleteItemAsync(key);
            setIsLoggedIn(false);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getValueOf("token").then((data) => {
            if (data) {
                setIsLoggedIn(true);
            }
        });
    }, []);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginAction, logoutAction }}>
            {children}
        </LoginContext.Provider>
    )
}