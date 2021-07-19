import React from 'react';

import './styles.css';

interface PageStyleProps {
    title: string
}

const PageStyle:React.FC<PageStyleProps> = ({ title, children }) => {
    return ( 
        <div className="page-style">
            <p className="page-title">{title}</p>
            {children}
        </div>
    )
}

export default PageStyle;