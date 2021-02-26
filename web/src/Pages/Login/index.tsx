import React, { FormEvent, useContext, useEffect, useState } from 'react';
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

    /**
     * Recupera do contexto os campos authenticated, isTokenValid e handleLogin
     */
    const { authenticated, handleLogin } = useContext<Ctx>(Context);

    /**
     * Realiza a mudanca de estado da aparicao do formulario de registro
     */
    function handleToggleOnRegisterForm() {
        setIsRegister(true);
    }
    
    /**
     * Realiza a mudanca de estado da aparicao do formulario de registro
     */
    function handleToggleOffRegisterForm() {
        setIsRegister(false);
    }

    /**
     * Realiza o cadastro do usuario
     * @param e 
     */
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

        api.post('/users', data).then(() => {
            alert("Usuário cadastrado com sucesso!");

            handleToggleOffRegisterForm();
            setEmailLogin(emailRegister);
        }).catch(() => {
            alert("Erro ao cadastrar usuário, tente novamente.")
        });
    }

    /**
     * Realiza o login do usuario
     * @param e 
     */
    function handleLoginForm(e: FormEvent) {
        e.preventDefault();

        handleLogin(emailLogin, passwordLogin);

        if (authenticated) {
            history.push('/Home');
        }
    }

    /** 
     * Verifica se o usuario ja esta logado
     */
    useEffect(() => {
        if (authenticated) {
            history.push('/Home');
        }
    }, [authenticated, history]);

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
                <div className="right">
                    {!isRegister && 
                        <>
                            <form onSubmit={handleLoginForm}>
                                <Input id="email" placeholder="E-mail" type="email" value={emailLogin} onChange={setEmailLogin} required />
                                <Input id="password" placeholder="Senha" type="password" value={passwordLogin} onChange={setPasswordLogin} required />
                                <div className="rememberMe">
                                    <input type="checkbox" />
                                    <label htmlFor="">Lembrar usuário</label>
                                </div>
                                <Button id="login" type="submit" style={{ background: '#37c77f99' }}>Entrar</Button>
                            </form>
                            <hr className="separator" />
                            <Button id="register" style={{ background: '#FFD66699', width: '90%' }} onClick={handleToggleOnRegisterForm}>Cadastrar</Button>
                        </>
                    }
                    {isRegister &&
                        <>
                            <p id="back" className="backButton" onClick={handleToggleOffRegisterForm}><FiChevronLeft size={25} color="#FFF" />Voltar</p>
                            <form onSubmit={handleAddNewUser}>
                                <Input id="name" placeholder="Nome" type="text" value={name} onChange={setName} required />
                                <Input id="birthday" placeholder="Data de nascimento" type="text" onFocus={(e) => e.target.type='date'} value={birthday} onChange={setBirthday} required />
                                <Input id="email" placeholder="E-mail" type="email" value={emailRegister} onChange={setEmailRegister} required />
                                <Input id="password" placeholder="Senha" type="password" value={passwordRegister} onChange={setPasswordRegister} required />

                                <hr className="separator" />
                                
                                <Input id="school" placeholder="Escola" type="text" value={school} onChange={setSchool} required />
                                <Input id="main-subject" placeholder="Disciplina" type="text" value={mainSubject} onChange={setMainSubject} required />
                                <Input id="formation" placeholder="Formação" type="text" value={formation} onChange={setFormation} required />
                                <Button id="register" type="submit" style={{ background: '#37c77f99', marginTop: '20px' }}>Cadastrar</Button>
                            </form>
                        </>
                    }
                </div>                
            </div>
        </div>
    );
}


export default Login;