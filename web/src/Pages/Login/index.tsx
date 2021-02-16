import React, { FormEvent, useContext, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import { Context, Ctx } from '../../Context/AuthContext';
import api from '../../Services/api';
import './styles.css';

const Login = () => {
    const history = useHistory();

    const [isRegister, setIsRegister] = useState(false);
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [school, setSchool] = useState("");
    const [mainSubject, setMainSubject] = useState("");
    const [formation, setFormation] = useState("");

    const { authenticated, handleLogin } = useContext<Ctx>(Context);

    function handleToggleOnRegisterForm() {
        setIsRegister(true);
    }

    function handleToggleOffRegisterForm() {
        setIsRegister(false);
    }

    function handleHomePage() {
        history.push('/Home');
    }

    function handleAddNewUser(e: FormEvent) {
        e.preventDefault();

        const data = {
            name,
            birthday,
            email: emailRegister,
            password: passwordRegister,
            main_subject: mainSubject,
            school,
            formation 
        };

        api.post('/', data).then(() => {
            alert("Usuário cadastrado com sucesso!");

            handleToggleOffRegisterForm();
            setEmailLogin(emailRegister);
        }).catch(() => {
            alert("Erro ao cadastrar usuário, tente novamente.")
        });
    }

    return (
        <div className="containerLogin">
            <div className="side">
                <div className="left">
                    <div className="logoArea">
                        <img src={logo} alt="TShareLogo"/>
                        <p className="logoText">Share</p>
                    </div>
                    <p className="text">O TShare ajuda você <b><i>professor</i></b> a criar e compartilhar questões em um ambiente colaborativo.</p>
                </div>
            </div>
            <div className="side">
                <div id="right">
                    {!isRegister && 
                        <>
                            <Input placeholder="E-mail" type="text" value={emailLogin} onChange={setEmailLogin} />
                            <Input placeholder="Senha" type="password" value={passwordLogin} onChange={setPasswordLogin} />
                            <div className="rememberMe">
                                <input type="checkbox" />
                                <label htmlFor="">Lembrar usuário</label>
                            </div>
                            <Button text="Entrar" style={{ background: '#37c77f99' }} onClick={() => {handleLogin(emailLogin, passwordLogin); handleHomePage()}} />
                            <hr className="separator" />
                            <Button text="Cadastrar" style={{ background: '#FFD66699', width: '90%' }} onClick={handleToggleOnRegisterForm} />
                        </>
                    }
                    {isRegister &&
                        <>
                            <p className="backButton" onClick={handleToggleOffRegisterForm}><FiChevronLeft size={25} color="#FFF" />Voltar</p>
                            <form onSubmit={handleAddNewUser}>
                                <Input placeholder="Nome" type="text" value={name} onChange={setName} />
                                <Input placeholder="Data de nascimento" type="text" value={birthday} onChange={setBirthday} />
                                <Input placeholder="E-mail" type="text" value={emailRegister} onChange={setEmailRegister} />
                                <Input placeholder="Senha" type="password" value={passwordRegister} onChange={setPasswordRegister} />

                                <hr className="separator" />
                                
                                <Input placeholder="Escola" type="text" value={school} onChange={setSchool} />
                                <Input placeholder="Disciplina" type="text" value={mainSubject} onChange={setMainSubject} />
                                <Input placeholder="Formação" type="text" value={formation} onChange={setFormation} />
                                <Button text="Cadastrar" type="submit" style={{ background: '#37c77f99', marginTop: '50px' }} />
                            </form>
                        </>
                    }
                </div>                
            </div>
        </div>
    )
}

export default Login;
