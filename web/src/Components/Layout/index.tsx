import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiBell, FiFileText, FiFolder, FiHome, FiLogOut, FiPlus, FiSearch, FiSettings, FiTrash2, FiX } from 'react-icons/fi';
import { ClickAwayListener } from '@material-ui/core';

import logo from '../../assets/logo2.svg';
import IconBt from '../IconBt';
import './styles.css';
import NavBt from '../NavBt';
//import SocialCard from '../SocialCard';
import UserProfileImg from '../UserProfileImg';
import { Context, Ctx } from '../../Context/AuthContext';
import Button from '../Button';
//import Search from './Components/Search';
import NotificationItem from './Components/NotificationItem';
import { AppContext, AppCtx } from '../../Context/ApplicationContext';

const Layout:React.FC = ({ children }) => {
    const { authenticated, handleLogOut, id: userID } = useContext<Ctx>(Context);
    const { searchText, setSearchText, searchActive, setSearchActive, showNotificationArea, setShowNotificationArea } = useContext<AppCtx>(AppContext);

    const [notificationsPopup, setNotificationsPopup] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            setShowNotificationArea(false);
        }, 1500);
    }, [showNotificationArea])

    function handleGoPerfilPage() {
        history.push(`/Profile/${userID}`);
    }

    function handleCloseNotificationsDialog() {
        setNotificationsPopup(false);
    }

    function handleSetSearch() {
        setSearchActive(true);
        history.push('/Search')
    }

    function handleCloseSearch() {
        setSearchActive(false);
        setSearchText("")
    }

    if (!authenticated) {
        return (
            <div className="container">{children}</div>
        );
    } else {
        return (
            <>
            <div className="container">
                <div className="content">
                    <header>
                        {notificationsPopup &&
                            <ClickAwayListener
                            onClickAway={handleCloseNotificationsDialog}
                            >
                                <div className="notifications glass-d3 glass">
                                    <div className="notifications-content">
                                        <div className="top-area">
                                            <p className="notification-label">Notificações</p>
                                            <IconBt className="clean-all" glass={false}><FiTrash2 color="#FFFFFE" size={20} /></IconBt>
                                        </div>
                                        <NotificationItem />
                                        <NotificationItem />
                                        <NotificationItem />
                                        <NotificationItem />
                                    </div>
                                </div>
                            </ClickAwayListener>
                        }
                        <img src={logo} alt="TShare logo"/>
                        <div className="header-left">
                            <div className={`search ${searchActive ? "glass-l2 search-area" : ""}`}>
                                {searchActive ?
                                    <>
                                    <FiSearch size={22} color="#FFF" />
                                    <input onClick={handleSetSearch} placeholder="Pesquisar..." className="" type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
                                    <FiX onClick={handleCloseSearch} size={22} color="#FFF" />
                                    </>
                                    :
                                    <IconBt glass onClick={handleSetSearch}><FiSearch size={22} color="#FFF" /></IconBt>
                                }
                            </div>
                            <IconBt glass onClick={() => setNotificationsPopup(true)}><FiBell size={22} color="#FFF" /></IconBt>
                            <UserProfileImg onClick={handleGoPerfilPage} className="userProfile" />
                        </div>
                    </header>
                    <nav className="navBar">
                        <div>
                            <Link id="new-question-bt" to="/CreateQuestion"><FiPlus color="#FFF" size={20} /><p>Nova Questão</p></Link>
        
                            <NavBt className="nav-item" to="/Home"><FiHome color="#FFF" size={20} /><p>Início</p></NavBt>
                            <NavBt className="nav-item" to="/QuestionBank"><FiFolder color="#FFF" size={20} /><p>Banco de questões</p></NavBt>
                            <NavBt className="nav-item" to="/NewTest"><FiFileText color="#FFF" size={20} /><p>Criar avaliação</p></NavBt>
                            <NavBt className="nav-item" to="/Settings"><FiSettings color="#FFF" size={20} /><p>Configurações</p></NavBt>
                        </div>

                        <Button className="nav-bt" id="logout-bt" onClick={handleLogOut}><FiLogOut color="#FFF" size={20} /><p>Sair</p></Button>
                    </nav>
                    <main className="glass-l1 main-content">
                        <div className="main-bg">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
            {showNotificationArea &&
                <div className="glass notification-area">
                    Item copiado!
                </div>
            }
            </>
        );
    }

}

export default Layout;
