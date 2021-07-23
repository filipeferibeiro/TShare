import React, { useEffect, useState } from 'react';
import PageStyle from '../../Components/PageStyle';
import QuestionCardFeed from '../../Components/QuestionCardFeed';
import { Question } from '../../Interfaces/interfaces';
import api from '../../Services/api';

import './styles.css';

const Home = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    /**
     * Realiza a consulta no servidor para retorno de todas as questões do banco
     */
     useEffect(() => {
        api.get('questions').then(response => {
            setQuestions(response.data);
        });
    }, []);


    return (
        <PageStyle title="Feed de questões">
            <div className="home-container">
                {questions.map((question) => (
                    <QuestionCardFeed 
                        key={question.id}
                        question={question}
                        showComments
                    />
                    ))}
            </div>
        </PageStyle>
    );
}

export default Home;