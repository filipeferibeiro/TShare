import React, { createContext, useState } from 'react';

interface AppCtx {
    searchText: string,
    setSearchText(text: string): any,
    searchActive: boolean,
    setSearchActive(status: boolean): any,
    showNotificationArea: boolean,
    setShowNotificationArea(status: boolean): any,
}

const defaultValues = { 
    searchText: "",
    setSearchText() {},
    searchActive: false,
    setSearchActive() {},
    showNotificationArea: false,
    setShowNotificationArea() {}
}

const AppContext = createContext<AppCtx>(defaultValues);

const ApplicationContext: React.FC = ({ children }) => {
    const [searchText, setSearchText] = useState("");
    const [searchActive, setSearchActive] = useState(false);
    const [showNotificationArea, setShowNotificationArea] = useState(false);

    return (
        <AppContext.Provider value={{ searchText, setSearchText, searchActive, setSearchActive, showNotificationArea, setShowNotificationArea }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, ApplicationContext };
export type { AppCtx };
