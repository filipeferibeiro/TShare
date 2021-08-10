import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../pages/Loading';
import api from '../services/api';
import { handleCheckToken } from '../services/login';

interface Ctx {
    authenticated: boolean,
    setAuthenticated(state: boolean): any,
    loading: boolean,
    id: number,
    handleLogOut(): any,
    setId(id: number): any,
    searchField: string,
    setSearchField(text: string): any,
    searchActive: boolean,
    setSearchActive(state: boolean): any,
}

const defaultValues = { 
    authenticated: false,
    setAuthenticated() {},
    loading: true,
    handleLogOut() {},
    id: -1,
    setId() {},
    searchField: "",
    setSearchField() {},
    searchActive: false,
    setSearchActive() {},
}

const Context = createContext<Ctx>(defaultValues);

const AuthProvider: React.FC = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(-1);
    const [searchField, setSearchField] = useState("");
    const [searchActive, setSearchActive] = useState(false);

    const history = useHistory();

    
    const handleLogOut = useCallback(() => {
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers['x-access-token'] = undefined;
        history.push('/');
    }, [history]);
    
    const value = {
        authenticated,
        setAuthenticated,
        loading,
        handleLogOut,
        id,
        setId,
        searchField,
        setSearchField,
        searchActive,
        setSearchActive,
    }
    /**
     * Verifica se tem algum token armazenado para seguir com o login automático
     */
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers['x-access-token'] = JSON.parse(token);

            handleCheckToken().then((id) => {
                if (id) {
                    setAuthenticated(true);
                    setId(id);
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }

    }, [history]);

    if (loading) {
        return <Loading />
    } else {
        return (
            <Context.Provider value={value}>
                {children}
            </Context.Provider>
        );
    }
}

export { Context, AuthProvider };
export type { Ctx };
