import React, { useState } from 'react';
import { FiPlus, FiUser, FiStar, FiMessageSquare, FiChevronRight, FiMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { QuestionCardProps } from '../../Interfaces/interfaces';
import Button from '../Button';
import CheckItens from '../CheckItens';
import PopupDialog from '../PopupDialog';
import TagItem from '../TagItem';

import './styles.css';

const QuestionCard: React.FC<QuestionCardProps> = ({ question, stars, comments, detail, id }) => {
    const [popupAddToBankStatus, setPopupAddToBankStatus] = useState(false);

    function handleOpenPopupAddToBank() {
        setPopupAddToBankStatus(true);
    }

    function handleIsAlternative() {
        if ((question.question_type === 0 || question.question_type === 1)) {
            return true;
        }
        return false;
    }
    
    function handleIsJustificative() {
        if ((question.question_type === 1 || question.question_type === 2)) {
            return true;
        }
        return false;
    }

    return (
        <>
        <PopupDialog
            popupDialogStatus={popupAddToBankStatus}
            setPopupDialogStatus={setPopupAddToBankStatus}
            title="Adicionar/Remover do banco"
        >
            <p className="questionName">{question.title}</p>
            <div className="listBanks">
                <div className="bankItem">
                    <p className="bankName glass-l2">Banco 1</p>
                    <Button><FiPlus color="#FFF" size={22} />Adicionar</Button>
                </div>
                <div className="bankItem">
                    <p className="bankName glass-l2">Banco 2</p>
                    <Button className="removeBank"><FiMinus color="#FFF" size={22} />Remover</Button>
                </div>
                <div className="bankItem">
                    <p className="bankName glass-l2">Banco 3</p>
                    <Button><FiPlus color="#FFF" size={22} />Adicionar</Button>
                </div>
                <div className="bankItem">
                    <p className="bankName glass-l2">Banco 4</p>
                    <Button><FiPlus color="#FFF" size={22} />Adicionar</Button>
                </div>
                <div className="bankItem">
                    <p className="bankName glass-l2">Banco 5</p>
                    <Button><FiPlus color="#FFF" size={22} />Adicionar</Button>
                </div>
                <div className="bankItem">
                    <p className="bankName glass-l2">Banco 6</p>
                    <Button><FiPlus color="#FFF" size={22} />Adicionar</Button>
                </div>
            </div>
        </PopupDialog>
        <div id={`questionCardContainer-${id}`} className="glass-l1 questionCardContainer">
            <div className="userField">
                <Link
                    id={`user-${id}`}
                    className="left"
                    to={{
                        pathname: "/Profile",
                        state: question.author
                    }}
                >
                    <div className="perfilPicture">
                        <FiUser color="#FFF" size={26} />
                    </div>
                    <div className="userInfo">
                        <p className="userName">{question.authorName}</p>
                    </div>
                </Link>
                <button id={`addBank-${id}`} className="addBankBt" onClick={handleOpenPopupAddToBank}><FiPlus color="#FFF" size={19} /></button>
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
                        id={`seeMore-${id}`}
                        className="action" 
                        to={{
                            pathname: "/QuestionDetail",
                            state: question.id
                        }}
                    >Ver Mais<FiChevronRight color="#FFF" size={22} /></Link>
                }
            </div>
        </div>
        </>
    )
}

export default QuestionCard;
