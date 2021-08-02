import React, { useContext, useEffect, useState } from 'react';
import PageStyle from '../../Components/PageStyle';
import QuestionCardFeed from '../../Components/QuestionCardFeed';
import { AppContext, AppCtx } from '../../Context/ApplicationContext';
import { Question } from '../../Interfaces/interfaces';
import api from '../../Services/api';

import './styles.css';

const Home = () => {
    const { reload, setReload } = useContext<AppCtx>(AppContext);
    const [questions, setQuestions] = useState<Question[]>([]);
    /**
     * Realiza a consulta no servidor para retorno de todas as questões do banco
     */
     useEffect(() => {
         api.get('questions').then(response => {
             setQuestions(response.data);
         });
    }, [reload]);


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