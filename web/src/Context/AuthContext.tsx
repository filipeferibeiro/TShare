import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../Services/api';

interface Ctx {
    authenticated: boolean,
    loading: boolean,
    isTokenValid: boolean,
    id: number,
    handleLogin(email: string, password: string): any,
    handleLogOut(): any,
    handleCheckToken(): any
}

const Context = createContext<Ctx>({ authenticated: false, handleLogin() {}, loading: true, handleLogOut() {}, isTokenValid: false, id: -1, handleCheckToken() {} });

const AuthProvider: React.FC = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [id, setId] = useState(-1);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers['x-access-token'] = JSON.parse(token);
            handleCheckToken();
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(email: string, password: string) {
        const body = {
            email,
            password
        }

        api.post('login', body).then(({ data: { token } }) => {
            setAuthenticated(true);

            localStorage.setItem('token', JSON.stringify(token));
            api.defaults.headers['x-access-token'] = token;

            handleCheckToken();
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
    
    async function handleCheckToken() {
        api.get('checkToken').then(({ data: { id } }) => {
            setIsTokenValid(true);
            setId(id);
        }).catch(() => {
            setIsTokenValid(false);
            setId(-1);
            handleLogOut();
            
            alert("Sua sessão expirou ou não é válida.");
        });
    }

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <Context.Provider value={{ authenticated, handleLogin, loading, handleLogOut, isTokenValid, id, handleCheckToken }}>
                {children}
            </Context.Provider>
        );
    }

}

export { Context, AuthProvider };
export type { Ctx };
