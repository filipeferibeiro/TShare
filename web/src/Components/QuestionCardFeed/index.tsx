import { ClickAwayListener } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { FiChevronRight, FiFolder, FiLink, FiMessageSquare, FiMoreHorizontal, FiStar } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { AppContext, AppCtx } from '../../Context/ApplicationContext';
import { Question } from '../../Interfaces/interfaces';
import CommentItem from '../CommentItem';
import TagItem from '../TagItem';
import UserProfileImg from '../UserProfileImg';
import BankStatus from './Components/BankStatus';

import './styles.css';

export interface QuestionCardFeedProps {
    question: Question;
    showComments?: boolean;
}

const QuestionCardFeed:React.FC<QuestionCardFeedProps> =  ({ question, showComments }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [popupAddToBankStatus, setPopupAddToBankStatus] = useState(false);

    const { setSearchText, setSearchActive, setShowNotificationArea } = useContext<AppCtx>(AppContext);
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

    return (
        <>
        <BankStatus 
            questionIdParam={question.id}
            questionTitleParam={question.title}
            popupAddToBankStatus={popupAddToBankStatus}
            setPopupAddToBankStatus={setPopupAddToBankStatus}
        />
        <div className="glass-d2 question-card-feed-container">
            {displayMenu &&
                <ClickAwayListener
                    onClickAway={() => setDisplayMenu(false)}
                >
                    <div className="glass-d3 glass question-card-feed-menu">
                        <button onClick={handlePopupBank}><FiFolder color="#FFFFFE" size={19} />Gerenciar no banco</button>
                        <button onClick={handleAddLinkToClipboard}><FiLink color="#FFFFFE" size={19} />Copiar link</button>
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
                <Link
                    className="action-detail" 
                    to={{
                        pathname: `/QuestionDetail/${question.id}`,
                    }}
                >Ver Mais<FiChevronRight color="#FFF" size={22} /></Link>
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
        </>
    );
}

export default QuestionCardFeed;