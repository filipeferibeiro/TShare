import React, { ButtonHTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import { iconColor, iconSize } from '../../constants/constants';
import { blackContainer, transition, rounded, redContainerHover } from '../../styles/styles';

interface IconProps {
    color: string;
    size: number
}

interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    to?: string;
    exact?: boolean;
    logout?: boolean;
    Icon: React.FC<IconProps>;
    newQuestion?: boolean
}

const NavButton:React.FC<NavButtonProps> = ({ text, to, exact, logout, Icon, newQuestion,...rest }) => {
    if (logout) {
        return (
            <button
                className={`
                    flex
                    gap-3
                    items-center
                    bg-transparent
                    px-6
                    py-4
                    c
                    ${rounded}
                    border
                    border-solid
                    border-transparent
                    ${transition}
                    text-white
                    ${redContainerHover}
                `}

                {...rest}
            >
                <Icon size={iconSize} color={iconColor} />
                <p className="flex items-center text-lg">{text}</p>
            </button>
        )
    }
    
    if(newQuestion) {
        return(
            <NavLink 
                to={to || "/"}
                exact={exact}
                className={`
                    bg-tshare
                    px-6
                    py-4
                    ${rounded}
                    border
                    border-solid
                    border-transparent
                    hover:border-white
                    ${transition}
                    text-white
                    flex
                    gap-3
                    items-center
                `}
                activeClassName={blackContainer}
            >   
                <Icon size={iconSize} color={iconColor} />
                <p className="flex items-center text-lg">{text}</p>
            </NavLink>
        )

    }

    return (
        <NavLink 
            to={to || "/"}
            exact={exact}
            className={`
                bg-transparent
                px-6
                py-4
                ${rounded}
                border
                border-solid
                border-transparent
                hover:border-white
                ${transition}
                text-white
                flex
                gap-3
                items-center
            `}
            activeClassName={blackContainer}
        >   
            <Icon size={iconSize} color={iconColor} />
            <p className="flex items-center text-lg">{text}</p>
        </NavLink>
    );
}

export default NavButton;