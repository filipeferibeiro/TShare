import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FiBook, FiBriefcase, FiEdit, FiFolder, FiMail, FiUser } from 'react-icons/fi';
import Button from '../../Components/Button';

import './styles.css';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../Services/api';
import { User } from '../../Interfaces/interfaces';
import { Context, Ctx } from '../../Context/AuthContext';
import QuestionCardFeed from '../../Components/QuestionCardFeed';
import PopupDialog from '../../Components/PopupDialog';
import PageStyle from '../../Components/PageStyle';

interface ProfileParams {
    idProfile: string
}

const Profile = () => {
    const [user, setUser] = useState<User>();
    const { idProfile } = useParams<ProfileParams>();

    const [popupEditProfileStatus, setPopupEditProfileStatus] = useState(false);

    const history = useHistory();
    const { id } = useContext<Ctx>(Context);

    const handleGetUser = useCallback(() => {
        api.get(`users/?id=${idProfile}`).then(response => {
            setUser(response.data[0]);
        })
    }, [idProfile]);

    useEffect(() => {
        handleGetUser();
    }, [idProfile, handleGetUser]);

    function handleIsLoggedUser() {
        return id === parseInt(idProfile);
    }

    function handleOpenEditProfilePopup() {
        setPopupEditProfileStatus(true);
    }

    const mock = {
        id: 1,
        title: "Teste",
        description: "Description TESTE",
        author: 1,
        authorName: "Filipe",
        alternatives: [{
            text: "blá",
            correct: 1
        },{
            text: "blá2",
            correct: 0
        }],
        tags: ["Teste", "Alô"],
        long_answer: "Sei lá, algo aqui",
        question_type: 1
    }

    return (
        <>
        <PageStyle title="Perfil">
            <div className="containerProfile">
                <div className="left">
                    <div className="glass-d2 block menuProfile">
                        <div className="profile">
                            <div className="perfilPicture">
                                <FiUser color="#FFF" size={26} />
                            </div>
                            <div className="userInfo">
                                <p className="userName">{user?.name}</p>
                            </div>
                        </div>
                        {handleIsLoggedUser() && 
                            <Button className="editProfileButton" onClick={handleOpenEditProfilePopup}><FiEdit color="#FFF" size={22} />Editar perfil</Button>
                        }
                        <p className="item"><FiMail color="#FFF" size={24} />{user?.email}</p>
                        <p className="item"><FiBriefcase color="#FFF" size={24} />Instituto de Algum Lugar</p>
                        <p className="item"><FiFolder color="#FFF" size={24} />34 Questões Compartilhadas</p>
                        <p className="item"><FiBook color="#FFF" size={24} />Professor de Matemática</p>
                    </div>
                    {/* <div className="glass-d1 block ad">
                        ANUNCIO
                    </div> */}
                </div>
                <div className="right">
                    <div className="profile-questions">
                        <h1 className="profile-questions-text">Questões publicadas</h1>
                        <select className="glass-l2 order-selector" name="" id="">
                            <option value="0">Criação</option>
                            <option value="1">Comentários</option>
                            <option value="2">Estrelas</option>
                        </select>
                    </div>
                    <div className="listContent">
                        <QuestionCardFeed question={mock} />
                        <QuestionCardFeed question={mock} />
                        <QuestionCardFeed question={mock} />
                    </div>
                </div>
            </div>
        </PageStyle>
        <PopupDialog
            popupDialogStatus={popupEditProfileStatus}
            setPopupDialogStatus={setPopupEditProfileStatus}
            title="Editar perfil"
        >
            <p>Nada ainda</p>
        </PopupDialog>
        </>
    );
}

export default Profile;