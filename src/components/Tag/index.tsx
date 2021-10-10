import React, { ButtonHTMLAttributes } from 'react';
import { FiTag } from 'react-icons/fi';
import { iconColor } from '../../constants/constants';
import { transition } from '../../styles/styles';

interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    createQuestion?: boolean;
}

const Tag:React.FC<TagProps> = ({ title, createQuestion, ...rest }) => {
    return (
        <button
            className={`flex items-center gap-2 bg-tshareBlue px-4 py-1 rounded-full text-white cursor-pointer ${createQuestion ? "" : "hover:opacity-70"} ${transition}`}
            {...rest}
        >
            <FiTag color={iconColor} />
            {title}
        </button>
    );
}

export default Tag;