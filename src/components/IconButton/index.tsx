import React, { useState } from 'react';
import { ButtonHTMLAttributes } from 'react';
import { iconColor, iconSize } from '../../constants/constants';
import { IconProps } from '../../interfaces/interfaces';
import { rounded, transition, blackContainerHover, whiteContainerHover, redContainerHover, yellowContainerHover, greenContainerHover, blackContainer } from '../../styles/styles';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    Icon: React.FC<IconProps>;
    onClick?(): any
    white?: boolean;
    red?: boolean;
    yellow?: boolean;
    green?: boolean;
    tooltip: string;
}


const IconButton:React.FC<IconButtonProps> = ({ Icon, onClick, white, red, yellow, green, tooltip, ...rest }) => {
    const [hoverState, setHoverState] = useState(false);

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

    function showHover() {
        setHoverState(true)
    }
    
    function hideHover() {
        setHoverState(false)
    }
    return (
        <div className="relative" onMouseEnter={showHover} onMouseLeave={hideHover}>
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
            {hoverState &&
                <p 
                    className={`absolute ${blackContainer} ${rounded} backdrop-filter w-max backdrop-blur-md z-30 py-2 px-4 mt-1 tooltip text-white font-light`}
                    onMouseEnter={hideHover}
                >
                    {tooltip}
                </p>
            }
        </div>
    )
}
/* <div className="relative"> */
/* {hoverState &&
    <div className={`absolute ${whiteContainer} ${rounded} backdrop-filter backdrop-blur-md z-40 py-2 px-4 mt-1`}>
        testeeeeeee
    </div>
}
</div> */
export default IconButton;