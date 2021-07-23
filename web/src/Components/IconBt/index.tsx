import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface IconBtProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    glass?: boolean
}

const IconBt:React.FC<IconBtProps> = ({ children, className, glass, ...rest }) => {
    return (
        <button className={`iconBt ${glass ? "glass" : ""} ${className} `} {...rest} >
            {children}
        </button>
    );
}

export default IconBt;
