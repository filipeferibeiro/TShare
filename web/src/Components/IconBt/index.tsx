import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

const IconBt:React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...rest }) => {
    return (
        <button className={`iconBt ${className}`} {...rest} >
            {children}
        </button>
    );
}

export default IconBt;
