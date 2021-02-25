import React, { InputHTMLAttributes } from 'react';
import { FiStar, FiUser } from 'react-icons/fi';

import { Comment } from '../../Pages/QuestionDetail';

import './styles.css';

interface QuestionCommentCardProps extends InputHTMLAttributes<HTMLInputElement> {
    comment: Comment;
}

const QuestionCommentCard: React.FC<QuestionCommentCardProps> = ({ comment }) => {
    return (
        <div className="glass-l1 questionCommentContainer">
            <div className="userField">
                <div className="left">
                    <div className="perfilPicture">
                        <FiUser color="#FFF" size={26} />
                    </div>
                    <div className="userInfo">
                        <p className="userName">{comment.name}</p>
                    </div>
                </div>
            </div>
            <p className="questionComment">{comment.text}</p>
            <div className="cardActions">
                <div className="cardActionsLeft">
                    <p className="action"><FiStar color="#FFF" size={22} />10 Estrelas</p>
                </div>
            </div>
        </div>
    );
}

export default QuestionCommentCard;
