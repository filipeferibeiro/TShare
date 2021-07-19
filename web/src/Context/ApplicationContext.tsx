import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../Pages/Loading';
import api from '../Services/api';

interface AppCtx {
    searchText: string,
    setSearchText(text: string): any,
}

const AppContext = createContext<AppCtx>({ searchText: "", setSearchText() {} });

const ApplicationContext: React.FC = ({ children }) => {
    const [searchText, setSearchText] = useState("");

    return (
        <AppContext.Provider value={{ searchText, setSearchText }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, ApplicationContext };
export type { AppCtx };
