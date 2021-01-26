import React, { InputHTMLAttributes } from 'react';
import { FiPlus, FiUser, FiStar, FiMessageSquare, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TagItem from '../TagItem';

import './styles.css';

interface QuestionCardProps extends InputHTMLAttributes<HTMLInputElement> {
    userName: string;
    questionName: string;
    questionDetail: string;
    stars: number;
    comments: number;
    tags: string[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({ userName, questionName, questionDetail, stars, comments, tags }) => {
    return (
        <div className="questionCardContainer">
            <div className="userField">
                <div className="left">
                    <div className="perfilPicture">
                        <FiUser color="#FFF" size={26} />
                    </div>
                    <div className="userInfo">
                        <p className="userName">{userName}</p>
                    </div>
                </div>
                <p className="addBankBt"><FiPlus color="#FFF" size={19} />Adicionar no banco</p>
            </div>
            <p className="questionName">{questionName}</p>
            <p className="questionDetail">{questionDetail}</p>

            <div className="tagsContainer">
                {tags.map((tag, i) => <TagItem label={tag} i={i} key={i} />)}
            </div>

            <div className="cardActions">
                <div className="cardActionsLeft">
                    <p className="action"><FiStar color="#FFF" size={22} />{stars} Estrelas</p>
                    <p className="action"><FiMessageSquare color="#FFF" size={22} />{comments} Comentários</p>
                </div>
                    <Link className="action" to="/QuestionDetail">Ver Mais<FiChevronRight color="#FFF" size={22} /></Link>
            </div>
        </div>
    )
}

export default QuestionCard;
