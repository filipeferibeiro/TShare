import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    text: string;
    style?: any;
    onClick?(): any
}

const Button: React.FC<ButtonProps> = ({ text, style, onClick }) => {
    return (
        <button className="button" style={style} onClick={onClick}>{text}</button>
    );
}

export default Button;
