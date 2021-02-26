import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../Pages/Loading';
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

    async function handleLogin(email: string, password: string) {
        const body = {
            email,
            password
        }

        api.post('login', body).then(({ data: { token } }) => {
            localStorage.setItem('token', JSON.stringify(token));
            api.defaults.headers['x-access-token'] = token;

            handleCheckToken();
        }).catch(() => {
            alert("Login :(")
        });
    }

    const handleLogOut = useCallback(() => {
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers['x-access-token'] = undefined;
        history.push('/');
    }, [history]);
    
    const handleCheckToken = useCallback(() => {
        api.get('checkToken').then(({ data: { id } }) => {
            setAuthenticated(true);
            setId(id);
            setLoading(false);
        }).catch(() => {
            setId(-1);
            setLoading(false);
            handleLogOut();
            
            alert("Sua sessão expirou ou não é válida.");
        });
    }, [handleLogOut]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers['x-access-token'] = JSON.parse(token);
            handleCheckToken();
        } else {
            setLoading(false);
        }
    }, [handleCheckToken]);

    if (loading) {
        return <Loading />
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
