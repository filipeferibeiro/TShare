import React, { FormEvent, useEffect, useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import HeaderBar from '../../Components/HeaderBar';
import QuestionCard from '../../Components/QuestionCard';
import QuestionCommentCard from '../../Components/QuestionCommentCard';
import api from '../../Services/api';
import { Question } from '../Home';

import './styles.css';

const QuestionDetail: React.FC = () => {
    const [question, setQuestion] = useState<Question>();
    const [commentBoxStatus, setCommentBoxStatus] = useState(false);
    const [comment, setComment] = useState("");

    const history = useHistory();
    const idQuestion = history.location.state;

    useEffect(() => {
        api.get(`questions/${idQuestion}`).then(response => {
            setQuestion(response.data);
        });
    }, [idQuestion]);

    function handleAddComment(e: FormEvent) {
        e.preventDefault();
    }

    function handleCloseCommentBox() {
        setCommentBoxStatus(false);
    }
    
    function handleOpenCommentBox() {
        setComment("");
        setCommentBoxStatus(true);
    }

    function setClassHidden() {
        if (!commentBoxStatus) {
            return "hidden";
        }
        return "";
    }

    return (
        <>
            <HeaderBar />
            <div className="questionDetailContainer">
                {question &&
                    <>
                        <div className="questionBlock">
                            <QuestionCard
                                detail
                                question={question}
                                stars={10}
                                comments={77}
                            />
                        </div>
                        <div className="commentsBlock">
                            <div className="commentsBlockHeader">
                                <p className="title">Comentários</p>
                                <p className="addCommentBt" onClick={handleOpenCommentBox}><FiPlus color="#FFF" size={19} />Novo comentário</p>
                            </div>
                            <QuestionCommentCard />
                            <QuestionCommentCard />
                            <QuestionCommentCard />
                            <QuestionCommentCard />
                            <QuestionCommentCard />
                        </div>
                    </>
                }
            </div>
            <div className={`newCommentContainer ${setClassHidden()}`}>
                <div className="commentBox">
                    <div className="commentBoxHeader">
                        <p>Novo comentário</p>
                        <FiX onClick={handleCloseCommentBox} size={28} color="#000" />
                    </div>
                    <hr className="separator" />
                    <form onSubmit={handleAddComment}>
                        <textarea className="commentField" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Digite seu comentário" required />
                        <button className="publishButton" type="submit">Publicar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default QuestionDetail;
