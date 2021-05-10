import React from 'react';
import { FiChevronRight, FiMessageSquare, FiMinus, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { QuestionBankCardProps } from '../../Interfaces/interfaces';
import api from '../../Services/api';

import './styles.css';

const QuestionBankCard: React.FC<QuestionBankCardProps> = ({ question, idBank, updateFunc }) => {
    function handleRemoveQuestionFromBank() {
        if (updateFunc) {
            api.delete(`removeQuestionFromBank?questionId=${question.id}&questionBankId=${idBank}`).then(() => {
                updateFunc();
                alert('Questão removida do banco!');
            }).catch(() => {
                alert("Erro ao remover questão do banco, tente novamente.")
            });
        }
    }

    return (
        <div className="glass-d1 containerBankCard">
            <div className="titleContainer">
                <button className="remove" onClick={handleRemoveQuestionFromBank}><FiMinus color="#FFF" size={18} /></button>
                <p className="title">{question.title}</p>
            </div>
            <div className="cardActions">
                <div className="cardActionsLeft">
                    <p className="action"><FiStar color="#FFF" size={22} />50 Estrelas</p>
                    <p className="action"><FiMessageSquare color="#FFF" size={22} />10 Comentários</p>
                </div>
                <Link
                    id={`seeMore-${question.id}`}
                    className="action" 
                    to={{
                        pathname: "/QuestionDetail",
                        state: question.id
                    }}
                >Ver Mais<FiChevronRight color="#FFF" size={22} /></Link>
            </div>
        </div>
    )
}

export default QuestionBankCard;
