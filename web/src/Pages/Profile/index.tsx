import React, { useState } from 'react';
import { FiBook, FiBriefcase, FiEdit, FiFolder, FiMail, FiUser } from 'react-icons/fi';
import Button from '../../Components/Button';
import HeaderBar from '../../Components/HeaderBar';
import QuestionCard from '../../Components/QuestionCard';
import OptionBar from '../../Components/OptionBar';

import './styles.css';

const Profile = () => {
    const [option, setOption] = useState([true, false, false]);

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
            <HeaderBar />
            <div className="containerProfile">
                <div className="left">
                    <div className="glass-l1 block menuProfile">
                        <div className="profile">
                            <div className="perfilPicture">
                                <FiUser color="#FFF" size={26} />
                            </div>
                            <div className="userInfo">
                                <p className="userName">Fulano de Tal</p>
                            </div>
                        </div>
                        <Button className="editProfileButton"><FiEdit color="#FFF" size={22} />Editar perfil</Button>
                        <p className="item"><FiMail color="#FFF" size={24} />mail@mail.com</p>
                        <p className="item"><FiBriefcase color="#FFF" size={24} />Intituto de algum lugar</p>
                        <p className="item"><FiFolder color="#FFF" size={24} />34 Questões Compartilhadas</p>
                        <p className="item"><FiBook color="#FFF" size={24} />Professor de Matemática</p>
                    </div>
                    <div className="glass-l1 block ad">
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
                        <QuestionCard stars={10} comments={4} question={mock} />
                        <QuestionCard stars={10} comments={4} question={mock} />
                        <QuestionCard stars={10} comments={4} question={mock} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
