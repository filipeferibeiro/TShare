import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    type: string;
    value: string;
    onChange(value: any): any;
}

const Input: React.FC<InputProps> = ({ placeholder, type, value, onChange }) => {
    return (
        <input className="input" placeholder={placeholder} type={type} onChange={(e) => onChange(e.target.value)} value={value} />
    );
}

export default Input;
