import React, { useContext, useEffect, useState } from 'react';
import PageName from '../../components/PageName';
import QuestionCardDefault from '../../components/QuestionCardDefault';
import { Context, Ctx } from '../../context/AuthContext';
import { QuestionProps } from '../../interfaces/interfaces';
import { getAllQuestions } from '../../services/questions';

const Search = () => {
    const { searchField } = useContext<Ctx>(Context);
    const [questions, setQuestions] = useState<QuestionProps[]>([]);
    const [filteredQuestions, setFilteredQuestions] = useState<QuestionProps[]>([]);

    async function getQuestions() {
        setQuestions(await getAllQuestions());
    }

    useEffect(() => {
        getQuestions();
    }, []);

    useEffect(() => {
        const searchUp = searchField.toUpperCase();
        setFilteredQuestions(JSON.parse(JSON.stringify(questions)).filter((question: QuestionProps) => {
            if (question.tags.map(tag => tag.toUpperCase()).filter(tag => tag.includes(searchUp) ? true : false).length > 0) {
                return true;
            }
            if (question.title.toUpperCase().split(' ').filter(item => item.includes(searchUp) ? true : false).length > 0) {
                return true;
            }
            if (question.description.toUpperCase().split(' ').filter(item => item.includes(searchUp) ? true : false).length > 0) {
                return true;
            }
            if (question.authorName.toUpperCase().includes(searchUp)) {
                return true;
            }

            return false;
        }));
    }, [searchField]);

    return (
        <div className="flex flex-col gap-5 overflow-y-auto">
            <PageName name="Pesquisa" />
            <div>
                {searchField.length > 0 
                    ?
                        filteredQuestions.length !== 0
                        ?
                        <div className="flex flex-col gap-5 overflow-y-auto pb-14">                            
                            <h1 className="text-white font-light text-xl">Resultados para: {searchField}</h1>
                            {filteredQuestions.map(question => (
                                <QuestionCardDefault key={question.id} question={question} func={getQuestions} />
                            ))}
                        </div>
                        :
                        <h1 className="text-white font-light text-xl">Nenhum resultado encontrado para: {searchField}</h1>
                    :
                    <h1 className="text-white font-light text-xl">Digite sua pesquisa...</h1>
                }
            </div>
        </div>
    );
}

export default Search;