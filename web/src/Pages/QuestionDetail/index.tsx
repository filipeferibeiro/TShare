import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import QuestionCard from '../../Components/QuestionCard';
import QuestionCommentCard from '../../Components/QuestionCommentCard';
import { Comment, Question } from '../../Interfaces/interfaces';
import api from '../../Services/api';

import './styles.css';

const QuestionDetail: React.FC = () => {
    const [question, setQuestion] = useState<Question>();
    const [comments, setComments] = useState([]);
    const [commentBoxStatus, setCommentBoxStatus] = useState(false);
    const [comment, setComment] = useState("");

    const history = useHistory();
    const idQuestion = history.location.state as number;
    
    const handleGetQuestion = useCallback(() => {
        api.get(`questions/${idQuestion}`).then(response => {
            setQuestion(response.data);
        })
    }, [idQuestion]);
    
    const handleGetComments = useCallback(() => {
        api.get(`comments/${idQuestion}`).then(response => {
            setComments(response.data);
        })
    }, [idQuestion]);

    useEffect(() => {
        handleGetQuestion();
        handleGetComments();

    }, [idQuestion, handleGetComments, handleGetQuestion]);
    

    function handleAddComment(e: FormEvent) {
        e.preventDefault();

        const data = {
            text: comment,
            question_id: idQuestion,
            author_id: 1
        }

        api.post('comments', data).then(() => {
            handleGetComments();
            alert("Comentário feito com sucesso!");
            setCommentBoxStatus(false);
        }).catch(() => {
            alert("Erro ao fazer o comentário, tente novamente.")
        });

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
            <div className="questionDetailContainer">
                {question &&
                    <>
                        <div className="questionBlock">
                            <QuestionCard
                                id={1}
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
                            {comments.map((_comment:Comment, index) => 
                                <QuestionCommentCard
                                    key={index}
                                    comment={_comment}
                                />
                            )}
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