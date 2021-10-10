import React from 'react';
import { QuestionProps } from '../../interfaces/interfaces';
import { blackContainer, rounded, whiteContainer } from '../../styles/styles';
import Checkbox from '../Checkbox';

interface QuestionAnswerCardProps {
    alternative?: boolean;
    justificative?: boolean;
    question: QuestionProps;
}

const QuestionAnswerCard:React.FC<QuestionAnswerCardProps> = ({ alternative, justificative, question }) => {
    return (
        <div className={`${whiteContainer} ${rounded} p-6`}>
            <h1 className={`text-white text-2xl font-semibold mb-3`}>Resposta do autor</h1>
            {alternative &&
                <div>
                    <p className={`text-white text-sm mb-4`}>Alternativas</p>
                    <div className={`flex flex-col gap-2`}>
                        {question.alternatives.map((alternativeM, index) => (
                            <Checkbox key={index} detail text={alternativeM.text} correct={alternativeM.correct === 1} />
                        ))}
                    </div>
                </div>
            }
            {justificative &&
                <div>
                    <p className={`text-white text-sm my-4`}>Resposta justificada</p>
                    <p className={`${blackContainer} ${rounded} p-3 text-white text-sm`}>{question.long_answer}</p>
                </div>
            }
        </div>
    );
}

export default QuestionAnswerCard;