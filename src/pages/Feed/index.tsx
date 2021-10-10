import React, { useState } from 'react';
import { useEffect } from 'react';
import PageName from '../../components/PageName';
import QuestionCardDefault from '../../components/QuestionCardDefault';
import { QuestionProps } from '../../interfaces/interfaces';
import { getAllQuestions } from '../../services/questions';

const Feed = () => {
    const [questions, setQuestions] = useState<QuestionProps[]>([]);
    async function getQuestions() {
        setQuestions(await getAllQuestions());
    }

    useEffect(() => {
        getQuestions();
    }, [])

    return (
        <div className="flex flex-col gap-5 overflow-y-auto pb-14">
            <PageName name="Feed de questões" />
            {questions.map(question => (
                <QuestionCardDefault key={question.id} question={question} func={getQuestions} />
            ))}
        </div>
    );
}

export default Feed;