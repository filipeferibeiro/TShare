import React from 'react';
import { FiUser } from 'react-icons/fi';

import './styles.css';

const UserProfileImg:React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
    return (
        <div className={`glass-l2 profile-img ${className}`} {...rest}>
            <FiUser color="#FFF" size={19} />
        </div>
    );
}

export default UserProfileImg;