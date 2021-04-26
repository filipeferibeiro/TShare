import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import './styles.css';

const NavBt:React.FC<NavLinkProps> = ({ children, className, ...rest }) => {
    return (
        <NavLink className={`nav-bt ${className}`} activeClassName="nav-bt-active" {...rest}>{children}</NavLink>
    );
}

export default NavBt;