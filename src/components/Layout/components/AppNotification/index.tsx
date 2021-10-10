import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppNotificationContext, AppNotificationCtx } from '../../../../context/AppNotificationContext';
import { greenContainer, redContainer, rounded, whiteContainer } from '../../../../styles/styles';

/**
 * Tipos de notificacao
 * 0 - Normal
 * 1 - Falha
 * 2 - Sucesso
 */
const AppNotification = () => {
    const { appNotificationActive, appNotificationTitle, appNotificationType } = useContext<AppNotificationCtx>(AppNotificationContext);

    const [color, setColor] = useState(whiteContainer);

    useEffect(() => {
        switch (appNotificationType) {
            case 0: setColor(`${whiteContainer}`); break;
            case 1: setColor(`${redContainer} text-white`); break;
            case 2: setColor(`${greenContainer} text-white`); break;
        }
    }, [appNotificationType])

    if (appNotificationActive) {
        return (
            <div className={`absolute ${color} ${rounded} bottom-4 py-6 px-8 backdrop-filter backdrop-blur-xl z-50 shadow-xl`}>
                {appNotificationTitle}
            </div>
        );
    }

    return (
        <>
        </>
    );
}

export default AppNotification;