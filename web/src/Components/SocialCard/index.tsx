import React from 'react';
import { SocialCardProps } from '../../Interfaces/interfaces';
import UserProfileImg from '../UserProfileImg';

import './styles.css';

const SocialCard:React.FC<SocialCardProps> = ({ name, status }) => {
    return (
        <div className="glass-d1 social-card">
            <div className="left">
                <UserProfileImg />
                <p className="name">{name}</p>
            </div>
            {status
                ?
                <div className="status-on" />
                :
                <div className="status-off">x</div>
            }
        </div>
    );
}

export default SocialCard;