import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    style?: any;
    onClick?(): any
}

const Button: React.FC<ButtonProps> = ({ style, onClick, children, ...rest }) => {
    return (
        <button className="button" style={style} onClick={onClick} {...rest}>{children}</button>
    );
}

export default Button;
