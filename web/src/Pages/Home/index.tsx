import React, { useEffect, useState } from 'react';
import HeaderBar from '../../Components/HeaderBar';
import QuestionCard from '../../Components/QuestionCard';

import api from '../../Services/api';

import './styles.css';

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
                <QuestionCard
                    key={1}
                    userName="Teste"
                    questionName="Nome da Questão 1"
                    questionDetail="Descição da Questão"
                    stars={10}
                    comments={77}
                    tags={["Teste", "Teste2", "Teste3"]}
                />
                <QuestionCard
                    key={2}
                    userName="Teste nome maior"
                    questionName="Nome da Questão 2"
                    questionDetail="Descição da Questão"
                    stars={10}
                    comments={77}
                    tags={["Teste", "Teste2", "Teste3"]}
                />
                <QuestionCard
                    key={3}
                    userName="Teste"
                    questionName="Nome da Questão 3"
                    questionDetail="Descição da Questão"
                    stars={10}
                    comments={77}
                    tags={["Teste", "Teste2", "Teste3"]}
                />
                <QuestionCard
                    key={4}
                    userName="Teste"
                    questionName="Nome da Questão 4"
                    questionDetail="Descição da Questão"
                    stars={10}
                    comments={77}
                    tags={["Teste", "Teste2", "Teste3"]}
                />
                {questions.map((question:Question, index) => (
                    <QuestionCard
                        key={index}
                        userName={question.authorName}
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
