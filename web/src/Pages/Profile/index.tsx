import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FiBook, FiBriefcase, FiEdit, FiFolder, FiMail, FiUser } from 'react-icons/fi';
import Button from '../../Components/Button';
import QuestionCard from '../../Components/QuestionCard';
import OptionBar from '../../Components/OptionBar';

import './styles.css';
import { useHistory } from 'react-router-dom';
import api from '../../Services/api';
import { User } from '../../Interfaces/interfaces';
import { Context, Ctx } from '../../Context/AuthContext';
/* import PopupDialog from '../../Components/PopupDialog'; */

const Profile = () => {
    const [user, setUser] = useState<User>();
    const [option, setOption] = useState([true, false, false]);

    const [popupEditProfileStatus, setPopupEditProfileStatus] = useState(false);

    const history = useHistory();
    const { id } = useContext<Ctx>(Context);
    const idParam = history.location.state as number;

    const handleGetUser = useCallback(() => {
        api.get(`users/?id=${idParam}`).then(response => {
            setUser(response.data[0]);
        })
    }, [idParam]);

    useEffect(() => {
        handleGetUser();
    }, [idParam, handleGetUser]);

    function handleIsLoggedUser() {
        return id === idParam;
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
        <div className="containerProfile">
            <div className="left">
                <div className="glass-d1 block menuProfile">
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
                <div className="glass-d1 block ad">
                    ANUNCIO
                </div>
            </div>
            <div className="right">
                <OptionBar
                    option={option}
                    setOption={setOption}
                    options={[
                        "Mais estrelas",
                        "Mais comentadas",
                        "Comentários votados"
                    ]}
                />
                <div className="listContent">
                    <QuestionCard id={1} stars={10} comments={4} question={mock} />
                    <QuestionCard id={2} stars={10} comments={4} question={mock} />
                    <QuestionCard id={3} stars={10} comments={4} question={mock} />
                </div>
            </div>
        </div>
        {/* <PopupDialog
            popupDialogStatus={popupEditProfileStatus}
            setPopupDialogStatus={setPopupEditProfileStatus}
            title="Editar perfil"
        >
            <p>Nada ainda</p>
        </PopupDialog> */}
        </>
    );
}

export default Profile;