import { ClickAwayListener } from '@material-ui/core';
import React, { useState } from 'react';
import { FiChevronRight, FiFolder, FiLink, FiMessageSquare, FiMoreHorizontal, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TagItem from '../TagItem';
import UserProfileImg from '../UserProfileImg';

import './styles.css';

const QuestionCardFeed:React.FC =  () => {
    const [displayMenu, setDisplayMenu] = useState(false);
    return (
        <div className="glass-d1 question-card-feed-container">
            {displayMenu &&
                <ClickAwayListener
                    onClickAway={() => setDisplayMenu(false)}
                >
                    <div className="glass-d3 glass question-card-feed-menu">
                        <button><FiFolder color="#FFFFFE" size={19} />Gerenciar no banco</button>
                        <button><FiLink color="#FFFFFE" size={19} />Copiar link</button>
                    </div>
                </ClickAwayListener>
            }
            <div className="question-card-feed-header">
                <div className="glass-d2 question-card-feed-user-field">
                    <UserProfileImg />
                    <div className="question-card-feed-text-box">
                        <p className="question-card-feed-user-name">
                            Betão
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
                <p className="questionName">Cloroquina é eficaz contra COVID-19?</p>
                <p className="questionDetail">Fonte: Zapzap</p>
            </div>
            <div className="question-card-feed-tags-container">
                <TagItem label="Tageeeeee" i={1} />
            </div>
            <div className="question-card-feed-comments-container">
                <div className="comment-field">
                    <UserProfileImg />
                    <div className="glass-d2 comment-section">
                        <p className="user-name">Betão</p>
                        <p className="comment">Muito boa a questãosMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questão</p>
                    </div>
                </div>
                <div className="comment-field">
                    <UserProfileImg />
                    <div className="glass-d2 comment-section">
                        <p className="user-name">Betão</p>
                        <p className="comment">Muito boa a questãos</p>
                    </div>
                </div>
                <div className="comment-field">
                    <UserProfileImg />
                    <div className="glass-d2 comment-section">
                        <p className="user-name">Betão</p>
                        <p className="comment">Muito boa a questãosMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questãoMuito boa a questão</p>
                    </div>
                </div>
            </div>
            <div className="question-card-feed-actions-container">
                <div className="question-card-feed-actions-container-left">
                    <p className="action"><FiStar color="#FFF" size={22} />10 Estrelas</p>
                    <p className="action"><FiMessageSquare color="#FFF" size={22} />20 Comentários</p>
                </div>
                <Link
                    className="action-detail" 
                    to={{
                        pathname: `/QuestionDetail/1`,
                    }}
                >Ver Mais<FiChevronRight color="#FFF" size={22} /></Link>
            </div>
        </div>
    );
}

export default QuestionCardFeed;