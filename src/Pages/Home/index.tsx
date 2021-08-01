import React, { useEffect, useState } from 'react';
import PopupDialog from '../../Components/PopupDialog';
import QuestionCard from '../../Components/QuestionCard';
import { Question } from '../../Interfaces/interfaces';

import api from '../../Services/api';

import './styles.css';

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [popupAddToBankStatus, setPopupAddToBankStatus] = useState(true);

    /**
     * Realiza a consulta no servidor para retorno de todas as questões do banco
     */
    useEffect(() => {
        api.get('questions').then(response => {
            setQuestions(response.data);
        });
    }, []);

    

    return (
        <div className="homeConatiner">
            <div className="questionBlock">
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
        </div>
    );
}

export default Home;
