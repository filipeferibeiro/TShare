import React, { InputHTMLAttributes } from 'react';
import { FiPlus, FiUser, FiStar, FiMessageSquare, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Question } from '../../Pages/Home';
import CheckItens from '../CheckItens';
import TagItem from '../TagItem';

import './styles.css';

interface QuestionCardProps extends InputHTMLAttributes<HTMLInputElement> {
    stars: number;
    comments: number;
    detail?: boolean;
    question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, stars, comments, detail }) => {
    function handleIsAlternative() {
        if ((question.question_type === 0 || question.question_type === 1)) {
            return true;
        }
        return false;
    }
    
    function handleIsJustificative() {
        if ((question.question_type === 0 || question.question_type === 2)) {
            return true;
        }
        return false;
    }

    return (
        <div className="questionCardContainer">
            <div className="userField">
                <div className="left">
                    <div className="perfilPicture">
                        <FiUser color="#FFF" size={26} />
                    </div>
                    <div className="userInfo">
                        <p className="userName">{question.authorName}</p>
                    </div>
                </div>
                <p className="addBankBt"><FiPlus color="#FFF" size={19} />Adicionar no banco</p>
            </div>
            <p className="questionName">{question.title}</p>
            <p className="questionDetail">{question.description}</p>

            {detail && 
                <div className="answerField">
                    {handleIsAlternative() &&
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
                    {handleIsJustificative() &&
                        <>
                            <p className="choicesGroup">Resposta</p>
                            <p className="longAnswer">{question.long_answer}</p>
                        </>
                    }
                </div>
            }
            <div className="tagsContainer">
                {question.tags.map((tag, i) => <TagItem label={tag} i={i} key={i} />)}
            </div>

            <div className="cardActions">
                <div className="cardActionsLeft">
                    <p className="action"><FiStar color="#FFF" size={22} />{stars} Estrelas</p>
                    <p className="action"><FiMessageSquare color="#FFF" size={22} />{comments} Comentários</p>
                </div>
                {!detail &&
                    <Link 
                        className="action" 
                        to={{
                            pathname: "/QuestionDetail",
                            state: question.id
                        }}
                    >Ver Mais<FiChevronRight color="#FFF" size={22} /></Link>
                }
            </div>
        </div>
    )
}

export default QuestionCard;
