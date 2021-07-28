import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange(value: any): any;
}

const Input: React.FC<InputProps> = ({ onChange, className, ...rest }) => {
    return (
        <input className={`glass-l2 input ${className}`} onChange={e => onChange(e.target.value)} { ...rest } />
    );
}

export default Input;