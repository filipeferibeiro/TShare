import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiUser, FiSearch, FiFolder, FiSettings, FiUsers, FiLogOut } from 'react-icons/fi';
import { ClickAwayListener } from '@material-ui/core';

import logo from '../../assets/logo.svg';
import './styles.css';
import { Context, Ctx } from '../../Context/AuthContext';

const HeaderBar = () => {
    let itemSize = 25;

    const [menuStatus, setMenuStatus] = useState(false);
    const { handleLogOut } = useContext<Ctx>(Context);

    return (
        <>
            <div className="headerContainer">
                <div className="left">
                    <div className="logoArea">
                        <img src={logo} alt="TShareLogo"/>
                    </div>
                    <div className="searchArea">
                        <FiSearch color="#FFF" size={24} />
                        <input type="text" placeholder="Pesquisar..." />
                    </div>
                </div>
                <div className="perfilArea">
                    <Link id="homeBt" className="homeBt" to="/Home">Início</Link>
                    <div id="menuBt" className="perfilPicture" onClick={() => setMenuStatus(!menuStatus)}>
                        <FiUser color="#FFF" size={24} />
                    </div>
                    <Link id="newQuestionBt" className="newQuestionBt" to="/CreateQuestion"><FiPlus color="#FFF" size={19} />Nova questão</Link>
                </div>
            </div>
            <div className="headerContainerMobile">
                <div className="searchArea">
                    <FiSearch color="#FFF" size={24} />
                    <input type="text" placeholder="Pesquisar..." />
                </div>
                <div id="menuBt" className="perfilPicture" onClick={() => setMenuStatus(!menuStatus)}>
                    <FiUser color="#FFF" size={24} />
                </div>
            </div>
            <div className="footerContainerMobile">
                Implementar futuramente
            </div>
            {menuStatus &&
                    <ClickAwayListener
                        onClickAway={() => setMenuStatus(false)}
                    >
                        <div className="menu">
                            <div className="back">
                                <Link className="menuProfile" to="/Profile">
                                    <div className="picture">
                                        <FiUser color="#FFF" size={17} />
                                    </div>
                                    <p>Fulano de Tal</p>
                                </Link>
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
                                <div className="menuItem logOut" onClick={handleLogOut}>
                                    <FiLogOut size={itemSize} color="#E72E2E" />
                                    <p>Sair</p>
                                </div>
                            </div>
                        </div>
                    </ClickAwayListener>
                }
        </>
    );
}

export default HeaderBar;
