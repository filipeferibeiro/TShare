import React from 'react';
import { FiStar, FiUser } from 'react-icons/fi';

import './styles.css';

const QuestionCommentCard = () => {
    return (
        <div className="questionCommentContainer">
            <div className="userField">
                <div className="left">
                    <div className="perfilPicture">
                        <FiUser color="#FFF" size={26} />
                    </div>
                    <div className="userInfo">
                        <p className="userName">Nome do Usuário</p>
                    </div>
                </div>
            </div>
            <p className="questionComment">ComentarioooooooooooooooooooooooooooooooooooooooooooooooComentarioooooooooooooooooooooooooooooooooooooooooooooooComentarioooooooooooooooooooooooooooooooooooooooooooooooComentarioooooooooooooooooooooooooooooooooooooooooooooooComentariooooooooooooooooooooooooooooooooooooooooooooooo</p>
            <div className="cardActions">
                <div className="cardActionsLeft">
                    <p className="action"><FiStar color="#FFF" size={22} />10 Estrelas</p>
                </div>
            </div>
        </div>
    );
}

export default QuestionCommentCard;