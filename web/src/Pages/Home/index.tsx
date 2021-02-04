import React, { useEffect, useState } from 'react';
import HeaderBar from '../../Components/HeaderBar';
import QuestionCard from '../../Components/QuestionCard';

import api from '../../Services/api';

import './styles.css';

export interface Question {
    id: number;
    title: string;
    description: string;
    author: number;
    authorName: string;
    alternatives: {
        text: string,
        correct: number
    }[];
    tags: string[];
    long_answer: string,
    question_type: number,
}

const Home = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        api.get('questions').then(response => {
            setQuestions(response.data);
        });
    }, []);

    return (
        <>
            <HeaderBar />
            <div className="homeConatiner">
                <div className="questionBlock">
                    {questions.map((question:Question, index) => (
                        <QuestionCard
                            key={index}
                            question={question}
                            stars={10}
                            comments={77}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
