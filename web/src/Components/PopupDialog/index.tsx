import { ClickAwayListener } from '@material-ui/core';
import React from 'react';
import { FiX } from 'react-icons/fi';
import { PopupDialogProps } from '../../Interfaces/interfaces';

import './styles.css';

const PopupDialog: React.FC<PopupDialogProps> = ({ popupDialogStatus, setPopupDialogStatus, title, children }) => {
    function setClassHidden() {
        if (!popupDialogStatus) {
            return "hidden";
        }
        return "";
    }

    function handleClosePopupDialog() {
        setPopupDialogStatus(false);
    }
    
    return (
        <div className={`popupContainer ${setClassHidden()}`}>
            {popupDialogStatus &&
                <ClickAwayListener
                    onClickAway={handleClosePopupDialog}
                >
                    <div className="popup-content">
                        <div className="contentTop">
                            <p>{title}</p>
                            <FiX onClick={handleClosePopupDialog} size={28} color="#000" />
                        </div>
                        <hr className="separator" />
                        {children}
                    </div>
                </ClickAwayListener>
            }
        </div>
    );
}

export default PopupDialog;
