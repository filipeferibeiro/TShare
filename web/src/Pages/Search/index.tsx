import React, { useContext, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import PageStyle from '../../Components/PageStyle';
import QuestionBankCard from '../../Components/QuestionBankCard';
import { AppCtx, AppContext } from '../../Context/ApplicationContext';

import './styles.css';


const Search = () => {
    const { searchText, setSearchText } = useContext<AppCtx>(AppContext);

    const mock = {
        id: 1,
        title: "Teste",
        description: "Testando",
        author: 1,
        authorName: "Filipe",
        alternatives: [],
        tags: ["Tag 1", "Tag 2"],
        long_answer: "string",
        question_type: 1,
    };
    
    return (
        <PageStyle title="Pesquisa">

            <div className="search-container">
            <div className="search-content">
                    <p>Sua pesquisa: {searchText}</p>
                    <div className="search-result">
                        <QuestionBankCard question={mock} idBank={1} />
                        <QuestionBankCard question={mock} idBank={1} />
                        <QuestionBankCard question={mock} idBank={1} />
                        <QuestionBankCard question={mock} idBank={1} />
                        <QuestionBankCard question={mock} idBank={1} />
                        <QuestionBankCard question={mock} idBank={1} />
                        <QuestionBankCard question={mock} idBank={1} />
                    </div>
                </div>
            </div>
        </PageStyle>
    );
}

export default Search;