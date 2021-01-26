import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiUser, FiSearch, FiFolder, FiSettings, FiUsers } from 'react-icons/fi';


import './styles.css';

const HeaderBar = () => {
    let itemSize = 25;

    const [menuStatus, setMenuStatus] = useState(false);

    return (
        <>
            <div className="headerContainer">
                <div className="left">
                    <div className="logoArea">
                        TShareLogo
                    </div>
                    <div className="searchArea">
                        <FiSearch color="#FFF" size={24} />
                        <input type="text" placeholder="Pesquisar..." />
                    </div>
                </div>
                <div className="perfilArea">
                    <Link id="homeBt" className="homeBt" to="/">Início</Link>
                    <div id="menuBt" className="perfilPicture" onClick={() => setMenuStatus(!menuStatus)}>
                        <FiUser color="#FFF" size={24} />
                    </div>
                    <Link id="newQuestionBt" className="newQuestionBt" to="/CreateQuestion"><FiPlus color="#FFF" size={19} />Nova questão</Link>
                </div>
            </div>
            {menuStatus &&
                    <div className="menu">
                        <div className="back">
                            <div className="menuProfile">
                                <div className="picture">
                                    <FiUser color="#FFF" size={17} />
                                </div>
                                <p>Fulano de Tal</p>
                            </div>
                            <div className="menuItem">
                                <FiFolder size={itemSize} color="#FFF" />
                                <p>Banco de questões</p>
                            </div>
                            <div className="menuItem">
                                <FiUsers size={itemSize} color="#FFF" />
                                <p>Minhas conexões</p>
                            </div>
                            <div className="menuItem">
                                <FiSettings size={itemSize} color="#FFF" />
                                <p>Configurações</p>
                            </div>
                        </div>
                    </div>
                }
        </>
    );
}

export default HeaderBar;
