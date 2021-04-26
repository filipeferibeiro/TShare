import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiBell, FiFolder, FiHome, FiLogOut, FiPlus, FiSearch, FiSettings, FiUser, FiUsers } from 'react-icons/fi';

import logo from '../../assets/logo2.svg';
import IconBt from '../IconBt';
import './styles.css';
import NavBt from '../NavBt';
import SocialCard from '../SocialCard';
import UserProfileImg from '../UserProfileImg';
import { Context, Ctx } from '../../Context/AuthContext';
import Button from '../Button';
import Search from './Components/Search';

const Layout:React.FC = ({ children }) => {
    const { authenticated, handleLogOut, id: userID } = useContext<Ctx>(Context);
    const [searchPopup, setSearchPopup] = useState(false);
    const history = useHistory();

    function handleGoPerfilPage() {
        history.push("/Profile", userID);
    }

    function handleOpenSearch() {
        setSearchPopup(true);
    }

    if (!authenticated) {
        return (
            <div className="container">{children}</div>
        );
    } else {
        return (
            <>
            <Search popupDialogStatus={searchPopup} setPopupDialogStatus={setSearchPopup} />
            <div className="container">
                <div className="content">
                    <header>
                        <IconBt onClick={handleOpenSearch}><FiSearch size={22} color="#FFF" /></IconBt>
                        <IconBt><FiBell size={22} color="#FFF" /></IconBt>
                        <UserProfileImg onClick={handleGoPerfilPage} className="userProfile" />
                    </header>
                    <nav className="navBar">
                        <img src={logo} alt=""/>
                        <Link id="new-question-bt" to="/CreateQuestion"><FiPlus color="#FFF" size={19} />Nova Questão</Link>
    
                        <NavBt className="nav-item" to="/Home"><FiHome color="#FFF" size={19} />Início</NavBt>
                        <NavBt className="nav-item" to="/MyConnections"><FiUsers color="#FFF" size={19} />Minhas conexões</NavBt>
                        <NavBt className="nav-item" to="/QuestionBank"><FiFolder color="#FFF" size={19} />Banco de questões</NavBt>
                        <NavBt className="nav-item" to="/Settings"><FiSettings color="#FFF" size={19} />Configurações</NavBt>

                        <Button className="nav-bt" id="logout-bt" onClick={handleLogOut}><FiLogOut color="#FFF" size={19} />Sair</Button>
                        {/* <NavBt id="logout-bt" to="/Logout"><FiLogOut color="#FFF" size={19} />Sair</NavBt> */}
                    </nav>
                    <nav className="navSocial">
                        <SocialCard name="Marlon" status />
                        <SocialCard name="Betão" />
                        <SocialCard name="Henrique" status />
                        <SocialCard name="Hugo" />
                        <SocialCard name="Guilherme" />
                        <SocialCard name="Guilherme" />
                        <SocialCard name="Guilherme" />
                        <SocialCard name="Guilherme" />
                        <SocialCard name="Guilherme" />
                        <SocialCard name="Guilherme" />
                        <SocialCard name="Guilherme" />
                        <SocialCard name="Guilherme" />
                        <SocialCard name="Guilherme" />
                        <SocialCard name="Guilherme" />
                        <SocialCard name="Guilherme" />
                    </nav>
                    <main className="glass-l1">
                        {children}
                    </main>
                </div>
            </div>
            </>
        );
    }

}

export default Layout;