import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { iconColor, iconSize } from '../../../../constants/constants';
import { IconProps } from '../../../../interfaces/interfaces';
import { blackContainerHover, rounded, transition, whiteContainerHover } from '../../../../styles/styles';

interface ProfileItemProps {
    text: string;
    Icon: React.FC<IconProps>;
    copy?: boolean;
    copyFunc?(): any
}

const ProfileItem:React.FC<ProfileItemProps> = ({ text, Icon, copy, copyFunc }) => {
    return (
        <div className={`${whiteContainerHover} ${rounded} ${transition} flex justify-between py-2 px-4 h-16 items-center cursor-default`}>
            <div className={`flex gap-3 items-center`}>
                <Icon color={iconColor} size={iconSize} />
                <p className={`text-white font-light`}>{text}</p>
            </div>
            {(copy && copyFunc) &&
                <button className={`${rounded} ${blackContainerHover} ${transition} p-3 cursor-pointer`} onClick={() => copyFunc()}>
                    <FiCopy color={iconColor} size={iconSize} />
                </button>
            }
        </div>
    );
}

export default ProfileItem;