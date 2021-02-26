import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiUser, FiSearch, FiFolder, FiSettings, FiUsers, FiLogOut } from 'react-icons/fi';
import { ClickAwayListener } from '@material-ui/core';

import logo from '../../assets/logo.svg';
import './styles.css';
import { Context, Ctx } from '../../Context/AuthContext';
import api from '../../Services/api';
import { User } from '../../Interfaces/interfaces';

const HeaderBar = () => {
    let itemSize = 25;
    
    const [user, setUser] = useState<User>();
    const [menuStatus, setMenuStatus] = useState(false);
    const { handleLogOut, id } = useContext<Ctx>(Context);

    const handleGetUser = useCallback(() => {
        api.get(`users/?id=${id}`).then(response => {
            setUser(response.data[0]);
        })
    }, [id]);

    useEffect(() => {
        handleGetUser();
    }, [id, handleGetUser]);

    return (
        <>
            <div className="glass-l1 headerContainer">
                <div className="left">
                    <div className="logoArea">
                        <img src={logo} alt="TShareLogo"/>
                    </div>
                    <div className="glass-l2 searchArea">
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
                        <div className="glass-l1 menu">
                            <div className="back">
                                <Link
                                    className="menuProfile"
                                    to={{
                                        pathname: "/Profile",
                                        state: id
                                    }}
                                >
                                    <div className="picture">
                                        <FiUser color="#FFF" size={17} />
                                    </div>
                                    <p>{user?.name}</p>
                                </Link>
                                <Link className="menuItem" to="/QuestionBank">
                                    <FiFolder size={itemSize} color="#FFF" />
                                    <p>Banco de questões</p>
                                </Link>
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