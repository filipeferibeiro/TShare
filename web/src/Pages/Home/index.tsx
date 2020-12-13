import React, { useEffect, useState } from 'react';
import HeaderBar from '../../Components/HeaderBar';
import QuestionCard from '../../Components/QuestionCard';

import api from '../../Services/api';

interface Question {
    title: string;
    description: string;
    author: number;
    authorName: string;
    alternatives: {
        text: string,
        correct: boolean
    }[];
    tags: string[];
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
                {questions.map((question:Question, index) => (
                    <QuestionCard
                        key={index}
                        userName={question.authorName}
                        subject="None"
                        questionName={question.title}
                        questionDetail={question.description}
                        stars={10}
                        comments={77}
                        tags={question.tags}
                    />
                ))}
            </div>
        </>
    );
}

export default Home;