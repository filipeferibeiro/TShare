import React, { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button';
import PopupDialog from '../../Components/PopupDialog';
import QuestionCard from '../../Components/QuestionCard';
import QuestionCommentCard from '../../Components/QuestionCommentCard';
import { Context, Ctx } from '../../Context/AuthContext';
import { Comment, Question } from '../../Interfaces/interfaces';
import api from '../../Services/api';

import './styles.css';

interface DetailParams {
    idQuestion?: string
}

const QuestionDetail: React.FC = () => {
    const [question, setQuestion] = useState<Question>();
    const [comments, setComments] = useState([]);
    const [commentBoxStatus, setCommentBoxStatus] = useState(false);
    const [comment, setComment] = useState("");

    const { idQuestion } = useParams<DetailParams>();
    const { id } = useContext<Ctx>(Context);
    
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
            author_id: id
        }

        api.post('comments', data).then(() => {
            handleGetComments();
            alert("Comentário feito com sucesso!");
            setCommentBoxStatus(false);
        }).catch(() => {
            alert("Erro ao fazer o comentário, tente novamente.")
        });

    }
    
    function handleOpenCommentBox() {
        setComment("");
        setCommentBoxStatus(true);
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
            <PopupDialog
                popupDialogStatus={commentBoxStatus}
                setPopupDialogStatus={setCommentBoxStatus}
                title="Novo comentário"
            >
                <form className="commentBox" onSubmit={handleAddComment}>
                    <textarea className="commentField" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Digite seu comentário" required />
                    <Button className="publishButton" type="submit">Publicar</Button>
                </form>
            </PopupDialog>
        </>
    );
}

export default QuestionDetail;