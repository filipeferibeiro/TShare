import React from 'react'
import HeaderBar from '../../Components/HeaderBar';
import QuestionCard from '../../Components/QuestionCard';
import QuestionCommentCard from '../../Components/QuestionCommentCard';

import './styles.css';

const QuestionDetail = () => {
    return (
        <>
            <HeaderBar />
            <div className="questionDetailContainer">
                <QuestionCard
                    key={3}
                    userName="Teste"
                    questionName="Nome da Questão 3"
                    questionDetail="Descição da Questão"
                    stars={10}
                    comments={77}
                    tags={["Teste", "Teste2", "Teste3"]}
                />
                <div className="commentsBlock">
                    <p>Comentários</p>
                    <QuestionCommentCard />
                    <QuestionCommentCard />
                    <QuestionCommentCard />
                    <QuestionCommentCard />
                    <QuestionCommentCard />
                </div>
            </div>
        </>
    );
}

export default QuestionDetail;