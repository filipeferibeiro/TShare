import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    type: string;
}

const Input: React.FC<InputProps> = ({ placeholder, type }) => {
    return (
        <input className="input" placeholder={placeholder} type={type} />
    );
}

export default Input;