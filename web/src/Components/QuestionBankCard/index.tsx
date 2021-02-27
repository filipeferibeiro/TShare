import React from 'react';
import { FiChevronRight, FiMessageSquare, FiMinus, FiStar } from 'react-icons/fi';

import './styles.css';

const QuestionBankCard = () => {
    return (
        <div className="glass-l1 containerBankCard">
            <div className="titleContainer">
                <button className="remove"><FiMinus color="#FFF" size={18} /></button>
                <p className="title">Quem deu o grito da independência?</p>
            </div>
            <div className="cardActions">
                <div className="cardActionsLeft">
                    <p className="action"><FiStar color="#FFF" size={22} />50 Estrelas</p>
                    <p className="action"><FiMessageSquare color="#FFF" size={22} />10 Comentários</p>
                </div>
                <a
                    id={`seeMore-1`}
                    className="action" 
                >Ver Mais<FiChevronRight color="#FFF" size={22} /></a>
            </div>
        </div>
    )
}

export default QuestionBankCard;