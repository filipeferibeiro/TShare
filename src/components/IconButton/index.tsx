import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import { iconColor, iconSize } from '../../constants/constants';
import { IconProps } from '../../interfaces/interfaces';
import { rounded, transition, blackContainerHover, whiteContainerHover, redContainerHover, yellowContainerHover, greenContainerHover } from '../../styles/styles';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    Icon: React.FC<IconProps>;
    onClick?(): any
    white?: boolean;
    red?: boolean;
    yellow?: boolean;
    green?: boolean;
}

const IconButton:React.FC<IconButtonProps> = ({ Icon, onClick, white, red, yellow, green, ...rest }) => {
    let color = "";

    if (white) {
        color = whiteContainerHover;
    } else if (red) {
        color = redContainerHover;
    } else if (yellow) {
        color = yellowContainerHover;
    } else if (green) {
        color = greenContainerHover;
    } else {
        color = blackContainerHover;
    }

    return (
        <button
            className={`
                p-4
                w-14
                h-14
                flex
                items-center
                justify-center
                ${rounded}
                ${color}
                ${transition}
            `}
            onClick={onClick}
            {...rest}
        >
            <Icon size={iconSize} color={iconColor} />
        </button>
    )
}

export default IconButton;