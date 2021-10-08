import React, { useContext } from 'react';
import logo from '../../assets/logo2.svg';
import NavButton from '../NavButton';
import { FiBell, FiFolder, FiHome, FiLogOut, FiPlus, FiSearch, FiSettings } from 'react-icons/fi';
import { blackContainer } from '../../styles/styles';
import IconButton from '../IconButton';
import ProfilePicture from '../ProfilePicture';
import SearchButton from '../SearchButton';
import { Context, Ctx } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import Popup from './components/Popup';
import AppNotification from './components/AppNotification';

const Layout:React.FC = ({ children }) => {
    const { authenticated, handleLogOut, id: userID, searchField, setSearchField } = useContext<Ctx>(Context);
    const history = useHistory();

    function handleUserProfile() {
        history.push(`/profile/${userID}`);
    }

    if (!authenticated) {
        return (
            <div className="h-screen flex justify-center">
                <AppNotification />
                <Popup />
                <div className="xl:max-w-7xl w-screen flex flex-col flex-1 overflow-hidden">
                    {children}
                </div>
            </div>
        );
    }
    
    return (
        <div className="h-screen flex justify-center">
            <AppNotification />
            <Popup />
            <div className="xl:max-w-7xl w-screen flex flex-col flex-1 overflow-hidden">
                <header className="flex justify-between items-center my-7">
                    <img src={logo} alt="TShare Logo" />
                    <div className="flex justify-end gap-2">
                        <SearchButton Icon={FiSearch} value={searchField} setValue={setSearchField} />
                        <IconButton Icon={FiBell} />
                        <button onClick={handleUserProfile}><ProfilePicture userId={userID} /></button>
                    </div>
                </header>
                <div className="flex flex-1 overflow-hidden gap-6">
                    <div className="w-80">
                        <nav className="h-full w-80 flex justify-between flex-col pb-4">
                            <div className="flex gap-2 flex-col">
                                <NavButton 
                                    text="Nova questão"
                                    to="/newQuestion"
                                    Icon={FiPlus}
                                    newQuestion
                                />
                                <NavButton 
                                    text="Início"
                                    to="/home"
                                    Icon={FiHome}
                                    exact 
                                />
                                <NavButton
                                    to="/banks" 
                                    Icon={FiFolder}
                                    text="Banco de questões"
                                />
                                <NavButton 
                                    text="Configurações"
                                    Icon={FiSettings}
                                    to="/settings" 
                                />
                            </div>
                            <NavButton 
                                text="Sair"
                                Icon={FiLogOut}
                                logout
                                onClick={handleLogOut}
                            />
                        </nav>
                    </div>
                    <div className={`flex-1 flex overflow-hidden pt-3 px-3 ${blackContainer} rounded-t-2xl rounded-b-none`}>
                        <div className="flex-1 p-3 overflow-y-scroll">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );    
}

export default Layout;