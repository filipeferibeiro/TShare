import React, { InputHTMLAttributes } from 'react';
import { rounded, whiteContainer } from '../../styles/styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange(value: any): any;
}

const Input: React.FC<InputProps> = ({ onChange, className, ...rest }) => {
    return (
        <input className={`${whiteContainer} ${rounded} text-white w-full font-light placeholder-gray-300 py-4 px-6 border-none focus:ring-blue-500 focus:outline-none ${className}`} onChange={e => onChange(e.target.value)} { ...rest } />
    );
}

export default Input;