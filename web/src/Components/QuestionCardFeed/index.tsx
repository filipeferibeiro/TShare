import { ClickAwayListener } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { FiChevronRight, FiEdit, FiFolder, FiLink, FiMessageSquare, FiMoreHorizontal, FiStar, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { AppContext, AppCtx } from '../../Context/ApplicationContext';
import { Context, Ctx } from '../../Context/AuthContext';
import { Question } from '../../Interfaces/interfaces';
import api from '../../Services/api';
import CommentItem from '../CommentItem';
import PopupDialog from '../PopupDialog';
import TagItem from '../TagItem';
import UserProfileImg from '../UserProfileImg';
import BankStatus from './Components/BankStatus';

import './styles.css';

export interface QuestionCardFeedProps {
    question: Question;
    showComments?: boolean;
    detail?: boolean;
}

const QuestionCardFeed:React.FC<QuestionCardFeedProps> =  ({ question, showComments, detail }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [popupAddToBankStatus, setPopupAddToBankStatus] = useState(false);
    const [popupConfirmDelete, setPopupConfirmDelete] = useState(false);

    const { id: userId } = useContext<Ctx>(Context);
    const { setSearchText, setSearchActive, setShowNotificationArea, reload, setReload } = useContext<AppCtx>(AppContext);
    const history = useHistory();

    function handleGoToProfile() {
        history.push(`/Profile/${question.author}`);
    }

    function handleTagToSearch(text: string) {
        setSearchText(text);
        setSearchActive(true);
        history.push('/Search');
    }

    function handleAddLinkToClipboard() {
        navigator.clipboard.writeText(`http://localhost:3333/QuestionDetail/${question.id}`).then((_) => {
            setShowNotificationArea(true);
        });
        setDisplayMenu(false);
    }
    
    function handlePopupBank() {
        setPopupAddToBankStatus(true);
        setDisplayMenu(false);
    }

    function handleDeleteDialog() {
        setPopupConfirmDelete(true);
    }

    function handleToEditPage() {
        history.push(`/EditQuestion/${question.id}`);
    }

    function handleDeleteQuestion() {
        api.delete(`questions/${question.id}`)
        .then(() => {
            alert("Questão deletada com sucesso");
            setPopupConfirmDelete(false);
            if (detail) {
                history.push("/Home");
            } else {
                setReload(!reload);
            }
        }).catch(() => {
            alert("Erro ao deletar questão.")
        });
    }

    return (
        <>
        <BankStatus 
            questionIdParam={question.id}
            questionTitleParam={question.title}
            popupAddToBankStatus={popupAddToBankStatus}
            setPopupAddToBankStatus={setPopupAddToBankStatus}
        />
        <PopupDialog
            popupDialogStatus={popupConfirmDelete}
            setPopupDialogStatus={setPopupConfirmDelete}
            title="Confirmação de remoção"
        >
            <div className="delete-dialog">
                <p>Deseja realmente remover a questão: {question.title}?</p>
                <p>Esta ação não poderá ser desfeita.</p>
                <div className="confirm-dialog">
                    <button onClick={() => setPopupConfirmDelete(false)}>Cancelar</button>
                    <button onClick={handleDeleteQuestion}>Deletar</button>
                </div>
            </div>

        </PopupDialog>
        <div>
            <div className="glass-d2 question-card-feed-container">
                {displayMenu &&
                    <ClickAwayListener
                        onClickAway={() => setDisplayMenu(false)}
                    >
                        <div className="glass-d3 glass question-card-feed-menu">
                            <button onClick={handlePopupBank}><FiFolder color="#FFFFFE" size={19} />Gerenciar no banco</button>
                            <button onClick={handleAddLinkToClipboard}><FiLink color="#FFFFFE" size={19} />Copiar link</button>
                            {(question.author === userId) && 
                                <>
                                <button onClick={handleToEditPage}><FiEdit color="#FFFFFE" size={19} />Editar</button>
                                <button className="delete" onClick={handleDeleteDialog}><FiTrash2 color="#FFFFFE" size={19} />Deletar</button>
                                </>
                            }
                        </div>
                    </ClickAwayListener>
                }
                <div className="question-card-feed-header">
                    <div onClick={handleGoToProfile} className="glass-d2 question-card-feed-user-field">
                        <UserProfileImg />
                        <div className="question-card-feed-text-box">
                            <p className="question-card-feed-user-name">
                                {question.authorName}
                            </p>
                            <p className="question-card-feed-question-date">
                                20/07/2021
                            </p>
                        </div>
                    </div>
                    <div onClick={() => setDisplayMenu(true)} className="question-card-feed-menu-bt">
                        <FiMoreHorizontal color="#FFFFFE" size={24} />
                    </div>
                </div>
                <div className="question-card-feed-question-container">
                    <p className="questionName">{question.title}</p>
                    <p className="questionDetail">{question.description}</p>
                </div>
                <div className="question-card-feed-tags-container">
                    {question.tags.map((tag, index) => (
                        <TagItem searchFunction={handleTagToSearch} key={index} label={tag} i={index} />
                    ))}
                </div>
                
                <div className="question-card-feed-actions-container">
                    <div className="question-card-feed-actions-container-left">
                        <p className="action"><FiStar color="#FFF" size={22} />10 Estrelas</p>
                        <p className="action"><FiMessageSquare color="#FFF" size={22} />{question.comments?.length} Comentários</p>
                    </div>
                    {!detail &&
                        <Link
                            className="action-detail" 
                            to={{
                                pathname: `/QuestionDetail/${question.id}`,
                            }}
                        >Ver Mais<FiChevronRight color="#FFF" size={22} /></Link>
                    }
                </div>
            </div>
            {(question.comments && showComments) && 
                <div className="question-card-feed-comments-container">
                    {question.comments.map((comment => (
                        <CommentItem
                            key={comment.id}
                            userName={comment.name || "nada"}
                            comment={comment.text}
                            commentScore={comment.score}
                        />
                    )))}
                </div>
            }
        </div>
        </>
    );
}

export default QuestionCardFeed;