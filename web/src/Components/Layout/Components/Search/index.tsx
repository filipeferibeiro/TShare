import { ClickAwayListener } from '@material-ui/core';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { PopupSearchProps } from '../../../../Interfaces/interfaces';
import QuestionBankCard from '../../../QuestionBankCard';

import './styles.css';

const Search:React.FC<PopupSearchProps> = ({ popupDialogStatus, setPopupDialogStatus }) => {
    const [searchText, setSearchText] = useState("");

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

    function handleClosePopupDialog() {
        setPopupDialogStatus(false);
    }

    return (
        <>
        {popupDialogStatus
            ?
            <div className="search-container">
                <ClickAwayListener
                    onClickAway={handleClosePopupDialog}
                >
                    <div className="search-content">
                        <div className="glass-l3 search-area">
                            <FiSearch color="#FFF" size={30} />
                            <input placeholder="Pesquisar..." className="glass-l3" type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
                        </div>
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
                </ClickAwayListener>
            </div>
            :
            <>
            </>
        }
        </>
    );
}

export default Search;
