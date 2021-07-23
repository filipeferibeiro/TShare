import React from 'react';
import { FiStar } from 'react-icons/fi';
import UserProfileImg from '../UserProfileImg';

import './styles.css';

interface CommentItemProps {
    userName: string;
    comment: string;
    commentScore: number;
    detail?: boolean
}

const CommentItem:React.FC<CommentItemProps> = ({ userName, comment, commentScore, detail }) => {
    const maxWords = 200;
    const commentText =  (((comment).length > maxWords) && !detail)
                    ? (((comment).substring(0,maxWords-3)) + '...') 
                    : comment

    return(
        <div className="comment-field">
            <UserProfileImg />
            <div className={`glass-d3 ${detail ? "comment-section-detail" : "comment-section"}`}>
                <p className="user-name">{userName}</p>
                <p className="comment">{commentText}</p>
                <p className="action"><FiStar color="#FFF" size={18} />{commentScore} Estrelas</p>
            </div>
        </div>
    );
}

export default CommentItem;