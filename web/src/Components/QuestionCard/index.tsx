import React, { InputHTMLAttributes } from 'react';
import { FiPlus, FiUser, FiStar, FiMessageSquare } from 'react-icons/fi';
import TagItem from '../TagItem';

import './styles.css';

interface QuestionCardProps extends InputHTMLAttributes<HTMLInputElement> {
    userName: string;
    subject: string;
    questionName: string;
    questionDetail: string;
    stars: number;
    comments: number;
    tags: string[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({ userName, subject, questionName, questionDetail, stars, comments, tags }) => {
    return (
        <div className="questionCardContainer">
            <div className="userField">
                <div className="left">
                    <div className="perfilPicture">
                        <FiUser color="#FFF" size={26} />
                    </div>
                    <div className="userInfo">
                        <p className="userName">{userName}</p>
                        <p className="questionSubject">Questão de {subject}</p>
                    </div>
                </div>
                <p className="addBankBt"><FiPlus color="#FFF" size={19} />Adicionar no banco</p>
            </div>
            <p className="questionName">{questionName}</p>
            <p className="questionDetail">{questionDetail}</p>

            <div className="tagsContainer">
                {tags.map((tag, i) => <TagItem label={tag} i={i} />)}
            </div>

            <div className="cardActions">
                <p className="action"><FiStar color="#8FA7B2" size={22} />{stars} Estrelas</p>
                <p className="action"><FiMessageSquare color="#8FA7B2" size={22} />{comments} Comentários</p>
            </div>
        </div>
    )
}

export default QuestionCard;