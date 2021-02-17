import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../Services/api';

interface Ctx {
    authenticated: boolean,
    loading: boolean,
    handleLogin(email: string, password: string): any,
    handleLogOut(): any
}

const Context = createContext<Ctx>({ authenticated: false, handleLogin() {}, loading: true, handleLogOut() {} });

const AuthProvider: React.FC = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

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
            api.defaults.headers['x-access-token'] = token;
        }).catch(() => {
            alert("Login :(")
        });
    }

    function handleLogOut() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers['x-access-token'] = undefined;
        history.push('/');
    }

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <Context.Provider value={{ authenticated, handleLogin, loading, handleLogOut }}>
                {children}
            </Context.Provider>
        );
    }

}

export { Context, AuthProvider };
export type { Ctx };
