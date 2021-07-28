import React from 'react';
import CheckItens from '../../../../Components/CheckItens';
import { Question } from '../../../../Interfaces/interfaces';

import './styles.css';

interface AnswerCardProps {
    isAlternative?: boolean;
    isJustificative?: boolean;
    defaultQuestion?: boolean;
    question: Question;
    className?: string;
}

const AnswerCard:React.FC<AnswerCardProps> = ({ isAlternative, isJustificative, defaultQuestion, question, className }) => {
    return (
        <div className={`glass-d2 answer-card ${className}`}>
            {defaultQuestion
                ?
                <h1>Resposta do autor</h1>
                :
                <h1>Resposta de Fulano</h1>
            }
            {isAlternative &&
                <>
                    <p className="choicesGroup">Alternativas</p>
                    {question.alternatives.map((alternative, index) => (
                        <CheckItens
                            detail
                            key={index}
                            name="alternativesDetail"
                            label={alternative.text}
                            selected={alternative.correct === 1}
                        />
                    ))}
                </>
            }
            {isJustificative &&
                <>
                    <p className="choicesGroup">Resposta justificada</p>
                    <p className="glass-l2 longAnswer">{question.long_answer}</p>
                </>
            }
        </div>
    );
}

export default AnswerCard;