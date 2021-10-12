import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import PageName from '../../components/PageName';
import QuestionCardDefault from '../../components/QuestionCardDefault';
import { Context, Ctx } from '../../context/AuthContext';
import { QuestionProps } from '../../interfaces/interfaces';
import { getAllQuestions } from '../../services/questions';
import { getTags } from '../../services/tags';

const Feed = () => {
    const { id: userId } = useContext<Ctx>(Context);
    const [questions, setQuestions] = useState<QuestionProps[]>([]);

    async function getQuestions() {
        const questionsRes: QuestionProps[] = await getAllQuestions();
        
        getTags(userId).then((res: string[]) => {
            setQuestions(questionsRes.sort((a, b) => {
                if (a.tags.some(r => res.includes(r)) && !b.tags.some(r => res.includes(r))) {
                    return -1;
                }
                if (b.tags.some(r => res.includes(r)) && !a.tags.some(r => res.includes(r))) {
                    return 1;
                }
                return 0;
            }))
        }).catch(() => {
            setQuestions(questionsRes);
        })

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