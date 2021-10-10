import React from 'react';
import { useContext } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { FiX } from 'react-icons/fi';
import { PopupContext, PopupCtx } from '../../../../context/PopupContext';
import { rounded, separatorPopup, whiteContainer } from '../../../../styles/styles';
import IconButton from '../../../IconButton';

const Popup = () => {
    const { popupActive, setPopupActive, popupTitle, popupContent } = useContext<PopupCtx>(PopupContext);

    function handleClosePopup() {
        setPopupActive(false);
    }

    if (popupActive) {
        return (
            <div className={`bg-black bg-opacity-60 h-screen w-screen flex justify-center items-center absolute backdrop-filter backdrop-blur-2xl z-40`}>
                <ClickAwayListener onClickAway={handleClosePopup}>
                    <div className={`xl:max-w-7xl w-screen h-auto ${whiteContainer} ${rounded} p-2 shadow-xl`}>
                        <header className={`flex justify-between items-center mb-2`}>
                            <p className={`pl-3 text-white font-bold text-lg`}>{popupTitle}</p>
                            <IconButton Icon={FiX} onClick={handleClosePopup} tooltip="Fechar" />
                        </header>
                        <hr className={`${separatorPopup}`} />
                        <div className={`mt-4`}>
                            {popupContent}
                        </div>
                    </div>
                </ClickAwayListener>
            </div>
        );
    }

    return (
        <>
        </>
    )

}

export default Popup;