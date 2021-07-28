import React, { FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { FiPlus, FiSend } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button';
import CheckItens from '../../Components/CheckItens';
import CommentItem from '../../Components/CommentItem';
import IconBt from '../../Components/IconBt';
import Input from '../../Components/Input';
import OptionBar from '../../Components/OptionBar';
import PopupDialog from '../../Components/PopupDialog';
import QuestionCard from '../../Components/QuestionCard';
import QuestionCardFeed from '../../Components/QuestionCardFeed';
import QuestionCommentCard from '../../Components/QuestionCommentCard';
import { Context, Ctx } from '../../Context/AuthContext';
import { Comment, Question } from '../../Interfaces/interfaces';
import api from '../../Services/api';
import AnswerCard from './Components/AnswerCard';

import './styles.css';

interface DetailParams {
    idQuestion?: string
}

const QuestionDetail: React.FC = () => {
    const [question, setQuestion] = useState<Question>();
    const [comments, setComments] = useState([]);
    const [commentBoxStatus, setCommentBoxStatus] = useState(false);
    const [comment, setComment] = useState("");
    const [option, setOption] = useState([true, false]);

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
            setComment("");
        }).catch(() => {
            alert("Erro ao fazer o comentário, tente novamente.")
        });

    }

    function handleIsAlternative() {
        if ((question?.question_type === 0 || question?.question_type === 1)) {
            return true;
        }
        return false;
    }
    
    function handleIsJustificative() {
        if ((question?.question_type === 1 || question?.question_type === 2)) {
            return true;
        }
        return false;
    }
    
    function handleOpenCommentBox() {
        
        setCommentBoxStatus(true);
    }

    return (
        <>
            <div className="questionDetailContainer">
                {question &&
                    <>
                        <div className="questionBlock">
                            <QuestionCardFeed
                                detail
                                question={question}
                            />
                        </div>
                        <AnswerCard
                            className="default-answer-card"
                            question={question}
                            isAlternative={handleIsAlternative()}
                            isJustificative={handleIsJustificative()}
                            defaultQuestion
                        />
                        <div className="detail-type">
                            <OptionBar 
                                option={option}
                                setOption={setOption}
                                options={[
                                    "Comentários",
                                    "Respostas alternativas"
                                ]}
                            />
                        </div>
                        {option[0] &&
                            <div className="commentsBlock">
                                <form className="commentsBlockCommentBlock" onSubmit={handleAddComment}>
                                    <Input placeholder="Deixe um comentário" className="commentField glass" value={comment} onChange={setComment} />
                                    <IconBt type="submit" className="glass send-bt" glass><FiSend size={24} color="#FFF" /></IconBt>
                                </form>
                                {comments.map((_comment:Comment) => 
                                    <CommentItem 
                                        key={_comment.id}
                                        userName={_comment.name || ""}
                                        comment={_comment.text}
                                        commentScore={_comment.score}
                                        detail
                                    />
                                )}
                            </div>
                        }
                        {option[1] &&
                            <div className="alternative-answer-container">

                            </div>
                        }
                    </>
                }
            </div>
            {/* <PopupDialog
                popupDialogStatus={commentBoxStatus}
                setPopupDialogStatus={setCommentBoxStatus}
                title="Novo comentário"
            >
                <form className="commentBox" onSubmit={handleAddComment}>
                    <textarea className="commentField" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Digite seu comentário" required />
                    <Button className="publishButton" type="submit">Publicar</Button>
                </form>
            </PopupDialog> */}
        </>
    );
}

export default QuestionDetail;