import React from 'react';
import { FiEdit, FiFolder, FiPlus } from 'react-icons/fi';
import QuestionBankCard from '../../Components/QuestionBankCard';

import './styles.css';

const QuestionBank = () => {
    return (
        <>
            <div className="glass-l1 containerQuestionBank">
                <div className="banks">
                    <div className="contentTop">
                        <p className="banksTitle">Bancos</p>
                        <button className="contentEditBt"><FiPlus color="#FFF" size={25} /></button>
                    </div>
                    <div className="banksList">
                        <button className="bankItem"><FiFolder color="#FFF" size={20} /> Item 1</button>
                        <button className="bankItem"><FiFolder color="#FFF" size={20} /> Item 2</button>
                        <button className="bankItem selected"><FiFolder color="#FFF" size={20} />História do Brasil</button>
                        <button className="bankItem"><FiFolder color="#FFF" size={20} /> Item 4</button>
                        <button className="bankItem"><FiFolder color="#FFF" size={20} /> Item 5</button>
                    </div>
                </div>
                <div className="content">
                    <div className="contentTop">
                        <p className="contentTitle">História do Brasil</p>
                        <button className="contentEditBt"><FiEdit color="#FFF" size={25} /></button>
                    </div>
                    <div className="contentCards">
                        <QuestionBankCard />
                        <QuestionBankCard />
                        <QuestionBankCard />
                        <QuestionBankCard />
                        <QuestionBankCard />
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionBank;