import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { iconColor, iconSize } from '../../constants/constants';
import { getImageProfile } from '../../services/images';
import { transition, blackContainer, whiteContainer } from '../../styles/styles';

interface ProfilePictureProps {
    profile?: boolean;
    white?: boolean;
    userId?: number;
}

const ProfilePicture:React.FC<ProfilePictureProps> = ({ profile, white, userId }) => {
    const [userImg, setUserImg] = useState<string>("");

    async function getImageAsync() {
        getImageProfile(`${userId}` || "-1", setUserImg);
    }

    useEffect(() => {
        if (userId) {
            getImageAsync();
        }
    }, [userId]);

    return (
        <div
            className={`
                ${white ? whiteContainer : blackContainer}
                ${userImg ? "" : "p-4"}
                flex
                justify-center
                items-center
                rounded-full
                border
                border-transparent
                hover:border-white
                ${transition}
                ${profile ? "w-44 h-44" : "w-14 h-14"}
            `}
        >
            {userImg
                ?
                <img className={`w-full h-full object-cover rounded-full`} src={userImg} alt="userImage" />
                :
                <FiUser size={profile ? 44 : iconSize} color={iconColor} />
            }
        </div>
    );
}

export default ProfilePicture;