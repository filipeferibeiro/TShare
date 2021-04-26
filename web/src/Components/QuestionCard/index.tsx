import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FiPlus, FiUser, FiStar, FiMessageSquare, FiChevronRight, FiMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Context, Ctx } from '../../Context/AuthContext';
import { Banks, QuestionCardProps } from '../../Interfaces/interfaces';
import api from '../../Services/api';
import Button from '../Button';
import CheckItens from '../CheckItens';
import PopupDialog from '../PopupDialog';
import TagItem from '../TagItem';

import './styles.css';

interface OptionBt {
    idBank: number
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, stars, comments, detail, id }) => {
    const [popupAddToBankStatus, setPopupAddToBankStatus] = useState(false);
    const [banks, setBanks] = useState<Banks[]>([]);
    const [banksAdded, setBanksAdded] = useState<Banks[]>([]);

    const { id: userID } = useContext<Ctx>(Context);

    const handleGetBanks = useCallback(() => {
        api.get(`questionBanks?author=${userID}`).then(response => {
            setBanks(response.data);
        });

        handleCheckQuestionBanks(question.id); // eslint-disable-next-line
    }, [userID]);
    
    function handleAddQuestionToBank(questionId: number, questionBankId:number) {
        api.post(`addQuestionToBank?questionId=${questionId}&questionBankId=${questionBankId}`).then(() => {
            handleCheckQuestionBanks(question.id);
            alert('Questão Adicionada com Sucesso ao banco!');
        }).catch(() => {
            alert('Erro ao adcionar questão ao banco!');
        });
    }
    
    function handleCheckQuestionBanks(id: number) {
        api.get(`questionBanksCheck?id=${id}&author=${userID}`).then((response) => {
            setBanksAdded(response.data);
        }).catch(() => {
            alert('Erro!');
        });
    }

    const HandleOptionBt: React.FC<OptionBt> = ({ idBank }) => {
        const filtered = banksAdded.filter((bank) => {
            return bank.id === idBank;
        });

        if (filtered.length > 0) {
            return (<Button className="removeBank"><FiMinus color="#FFF" size={22} />Remover</Button>);
        }
        return (<Button onClick={() => handleAddQuestionToBank(question.id, idBank)}><FiPlus color="#FFF" size={22} />Adicionar</Button>)
    }

    useEffect(() => {
        if (popupAddToBankStatus) {
            handleGetBanks();
        } else {
            setBanks([]);
        }
    }, [popupAddToBankStatus, handleGetBanks])

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
                {banks.length === 0 &&
                    <p className="noBanks">Você ainda não possui nenhum banco de questões.</p>
                }
                {banks.map((bank, index) => (
                    <div key={index} className="bankItem">
                        <p className="bankName glass-l2">{bank.title}</p>
                        <HandleOptionBt idBank={bank.id} />
                    </div>
                ))}
            </div>
        </PopupDialog>
        <div id={`questionCardContainer-${id}`} className="glass-d1 questionCardContainer">
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
