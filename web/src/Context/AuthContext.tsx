import React, { createContext, useEffect, useState } from 'react';
import api from '../Services/api';

interface Ctx {
    authenticated: boolean,
    loading: boolean,
    handleLogin(email: string, password: string): any
}

const Context = createContext<Ctx>({ authenticated: false, handleLogin() {}, loading: true });

const AuthProvider: React.FC = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers['x-access-token'] = JSON.parse(token);
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(email: string, password: string) {
        const body = {
            id: 4,
            email,
            password
        }

        api.post('login', body).then(({ data: { token } }) => {
            setAuthenticated(true);

            localStorage.setItem('token', JSON.stringify(token));
            api.defaults.headers['x-access-token'] = token ;
        }).catch(() => {
            alert("Login :(")
        });
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin, loading }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider };
export type { Ctx };
