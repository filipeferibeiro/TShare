import React, { useEffect, useState } from 'react';
import PageStyle from '../../Components/PageStyle';
import QuestionCard from '../../Components/QuestionCard';
import QuestionCardFeed from '../../Components/QuestionCardFeed';
import { Question } from '../../Interfaces/interfaces';
import api from '../../Services/api';

import './styles.css';

const Home = () => {
    const [questions, setQuestions] = useState([]);
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
                <QuestionCardFeed />
                <QuestionCardFeed />
                {questions.map((question:Question, index) => (
                        <QuestionCard
                            key={index}
                            id={index}
                            question={question}
                            stars={10}
                            comments={77}
                        />
                    ))}
            </div>
        </PageStyle>
    );
}

export default Home;