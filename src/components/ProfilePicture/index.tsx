import React from 'react';
import { FiUser } from 'react-icons/fi';
import { iconColor, iconSize } from '../../constants/constants';
import { transition, blackContainer, whiteContainer } from '../../styles/styles';

interface ProfilePictureProps {
    profile?: boolean;
    white?: boolean;
}

const ProfilePicture:React.FC<ProfilePictureProps> = ({ profile, white }) => {
    return (
        <div
            className={`
                ${white ? whiteContainer : blackContainer}
                p-4
                flex
                justify-center
                items-center
                rounded-full
                border
                border-transparent
                hover:border-white
                ${transition}
                ${profile ? "w-44 h-44" : ""}
            `}
        >
            <FiUser size={profile ? 44 : iconSize} color={iconColor} />
        </div>
    );
}

export default ProfilePicture;