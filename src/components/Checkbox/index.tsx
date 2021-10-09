import React from 'react';
import { checkBox, checkBoxCheck } from '../../styles/styles';

interface CheckboxProps {
    detail?: boolean;
    login?: boolean;
    text?: string;
    correct?: boolean;
    onClick?(): any; 
}

const Checkbox:React.FC<CheckboxProps> = ({ detail, login, text, correct, onClick }) => {
    if (detail) {
        return (
            <div className={`flex items-center gap-2`}>
                <div className={`${correct ? checkBoxCheck : checkBox}`}></div>
                <p className={`text-white text-base`}>{text}</p>
            </div>
        );
    }
    
    return (
        <button onClick={onClick} className={`flex items-center gap-2`} type="button">
            <div className={`${correct ? checkBoxCheck : checkBox}`}></div>
            <p className={`text-white ${login ? "font-light text-sm" : "text-base"}`}>{text}</p>
        </button>
    );
}

export default Checkbox;