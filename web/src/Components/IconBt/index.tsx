import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

const IconBt:React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
    return (
        <button className="iconBt" {...rest} >
            {children}
        </button>
    );
}

export default IconBt;
