import React from 'react';
import { FiEdit, FiFolder } from 'react-icons/fi';
import HeaderBar from '../../Components/HeaderBar';

import './styles.css';

const QuestionBank = () => {
    return (
        <>
            <HeaderBar />
            <div className="glass-l1 containerQuestionBank">
                <div className="banks">
                    <p className="banksTitle">Bancos</p>
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
                </div>
            </div>
        </>
    )
}

export default QuestionBank;