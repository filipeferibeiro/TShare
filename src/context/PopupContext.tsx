import React, { createContext, useEffect, useState } from 'react';

interface PopupCtx {
    popupActive: boolean,
    setPopupActive(state: boolean): any,
    popupTitle: string,
    setPopupTitle(title: string): any,
    popupContent: React.FC,
    setPopupContent(Component: React.FC): any,
    createPopup(title:string, Component:React.FC): any,
}

const defaultValues = { 
    popupActive: false,
    setPopupActive() {},
    popupTitle: "",
    setPopupTitle() {},
    popupContent: () => (<p></p>),
    setPopupContent(Component: React.FC) {},
    createPopup() {}
}

const PopupContext = createContext<PopupCtx>(defaultValues);

const PopupComponent: React.FC = ({ children }) => {
    const [popupActive, setPopupActive] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [popupContent, setPopupContent] = useState<React.FC>(() => (<p></p>));
    
    const value = {
        popupActive,
        setPopupActive,
        popupTitle,
        setPopupTitle,
        popupContent,
        setPopupContent,
        createPopup
    }

    useEffect(() => {
        if (!popupActive) {
            setPopupTitle("");
            setPopupContent(() => (<p></p>));
        }
    },[popupActive]);

    function createPopup(title:string, Component:React.FC) {
        setPopupContent(Component);
        setPopupTitle(title);
        setPopupActive(true);
    }
    
    return (
        <PopupContext.Provider value={value}>
            {children}
        </PopupContext.Provider>
    );
}

export { PopupContext, PopupComponent };
export type { PopupCtx };
