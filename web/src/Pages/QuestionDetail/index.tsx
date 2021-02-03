import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import HeaderBar from '../../Components/HeaderBar';
import QuestionCard from '../../Components/QuestionCard';
import QuestionCommentCard from '../../Components/QuestionCommentCard';
import api from '../../Services/api';
import { Question } from '../Home';

import './styles.css';

const QuestionDetail: React.FC = () => {
    const [question, setQuestion] = useState<Question>();
    const history = useHistory();
    const idQuestion = history.location.state;

    useEffect(() => {
        api.get(`questions/${idQuestion}`).then(response => {
            setQuestion(response.data);
        });
    }, [idQuestion]);

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
                                <p className="addCommentBt"><FiPlus color="#FFF" size={19} />Novo comentário</p>
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
        </>
    );
}

export default QuestionDetail;
