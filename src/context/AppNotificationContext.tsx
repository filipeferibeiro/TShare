import React, { createContext, useEffect, useState } from 'react';

interface AppNotificationCtx {
    appNotificationActive: boolean,
    setAppNotificationActive(state: boolean): any,
    appNotificationTitle: string,
    setAppNotificationTitle(title: string): any,
    appNotificationType: number,
    setAppNotificationType(type: number): any,
    showNotification(title:string, type:number): any,
}

const defaultValues = { 
    appNotificationActive: false,
    setAppNotificationActive() {},
    appNotificationTitle: "",
    setAppNotificationTitle() {},
    appNotificationType: 0,
    setAppNotificationType() {},
    showNotification() {},
}

const AppNotificationContext = createContext<AppNotificationCtx>(defaultValues);

const AppNotificationComponent: React.FC = ({ children }) => {
    const [appNotificationActive, setAppNotificationActive] = useState(false);
    const [appNotificationTitle, setAppNotificationTitle] = useState("");
    const [appNotificationType, setAppNotificationType] = useState(0);
    
    const value = {
        appNotificationActive,
        setAppNotificationActive,
        appNotificationTitle,
        setAppNotificationTitle,
        appNotificationType,
        setAppNotificationType,
        showNotification,
    }

    function showNotification(title:string, type:number) {
        setAppNotificationTitle(title);
        setAppNotificationType(type);
        setAppNotificationActive(true);
    }
    
    useEffect(() => {
        setTimeout(() => {
            setAppNotificationActive(false);
        }, 2000);
    }, [appNotificationActive])

    return (
        <AppNotificationContext.Provider value={value}>
            {children}
        </AppNotificationContext.Provider>
    );
    
}

export { AppNotificationContext, AppNotificationComponent };
export type { AppNotificationCtx };
