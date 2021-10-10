import React, { FormEvent, useContext, useState } from 'react';
import { useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import { AppNotificationContext, AppNotificationCtx } from '../../context/AppNotificationContext';
import { Context, Ctx } from '../../context/AuthContext';
import { handleCheckToken, postLogin, postUsers } from '../../services/login';
import { blackContainer, button, loginForm, rounded, separator, transition } from '../../styles/styles';

const Login = () => {
    const history = useHistory();
    const { setId, setAuthenticated, authenticated } = useContext<Ctx>(Context);
    const { showNotification } = useContext<AppNotificationCtx>(AppNotificationContext);
    
    const [isRegister, setIsRegister] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [school, setSchool] = useState("");
    const [mainSubject, setMainSubject] = useState("");
    const [formation, setFormation] = useState("");

    useEffect(() => {
        const email = localStorage.getItem('email');

        if (email) {
            setEmailLogin(email);
            setRememberMe(true);
        }
    }, []);

    useEffect(() => {
        if(authenticated) {
            history.push('/home');
        }
    }, [authenticated]);

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
     * Faz a chamada a API de login, se o token for valido seta o id e o authenticated e vai para home
     * @param e 
     */
    function handleLogin(e: FormEvent) {
        e.preventDefault();

        postLogin(emailLogin, passwordLogin).then((res) => {
            if (res) {
                handleCheckToken().then((id) => {
                    if (id) {
                        if (rememberMe) {
                            saveEmail(emailLogin);
                        } else {
                            localStorage.removeItem('email');
                        }
                        setId(id);
                        setAuthenticated(true);
                    }
                })
            } else {
                showNotification("Falha ao realizar login, tente novamente!", 1);
            }
        })
    }

    /**
     * Realiza o cadastro do usuario
     * @param e 
     */
    function handleNewUser(e: FormEvent) {
        e.preventDefault();

        postUsers(name, birthday, emailRegister, passwordRegister, mainSubject, school, formation).then((res) => {
            if (res) {
                handleToggleOffRegisterForm();
                setEmailLogin(emailRegister);
                showNotification("Usuário criado com sucesso!", 2);
            } else {
                showNotification("Falha ao realizar cadastro, tente novamente!", 1);
            }
        })
    }

    function saveEmail(email:string) {
        localStorage.setItem('email', email);
    }

    return (
        <div className="flex justify-center items-center gap-12 w-full h-full">
            <div className="flex flex-col flex-1">
                <div className="flex items-baseline">
                    <img className="w-auto h-40" src={logo} alt="TShareLogo"/>
                    <p className="font-semibold text-7xl tshare-color">ShareTS</p>
                </div>
                <p className="mt-4 text-3xl text-gray-200">O TShare ajuda você <b><i>professor</i></b> a criar e compartilhar questões em um ambiente colaborativo.</p>
            </div>
            <div className={`flex-1 ${blackContainer} ${rounded} p-6 flex flex-col justify-center items-center`}>
                {!isRegister && 
                    <>
                        <form className={`${loginForm}`} onSubmit={handleLogin}>
                            <Input id="email" placeholder="E-mail" type="email" value={emailLogin} onChange={setEmailLogin} required />
                            <Input id="password" placeholder="Senha" type="password" value={passwordLogin} onChange={setPasswordLogin} required />
                            <div className="flex gap-3 items-center">
                                <Checkbox login text="Lembrar usuário" correct={rememberMe} onClick={() => setRememberMe(!rememberMe)} />
                            </div>
                            <button id="login" type="submit" className={`bg-tshare ${button}`}>Entrar</button>
                        </form>
                        <hr className={`${separator}`} />
                        <button id="register" className={`w-3/4 bg-tshareYellow ${button}`} onClick={handleToggleOnRegisterForm}>Cadastrar</button>
                    </>
                }
                {isRegister &&
                    <>
                        <p id="back" className={`flex w-full items-center text-white cursor-pointer hover:opacity-70 ${transition}`} onClick={handleToggleOffRegisterForm}><FiChevronLeft size={25} color="#FFF" />Voltar</p>
                        <form className={`${loginForm} mt-4`} onSubmit={handleNewUser}>
                            <Input id="name" placeholder="Nome" type="text" value={name} onChange={setName} required />
                            <Input id="birthday" placeholder="Data de nascimento" type="text" onFocus={(e) => e.target.type='date'} value={birthday} onChange={setBirthday} required />
                            <Input id="email" placeholder="E-mail" type="email" value={emailRegister} onChange={setEmailRegister} required />
                            <Input id="password" placeholder="Senha" type="password" value={passwordRegister} onChange={setPasswordRegister} required />

                            <hr className={`${separator}`} />
                            
                            <Input id="school" placeholder="Escola" type="text" value={school} onChange={setSchool} required />
                            <Input id="main-subject" placeholder="Disciplina" type="text" value={mainSubject} onChange={setMainSubject} required />
                            <Input id="formation" placeholder="Formação" type="text" value={formation} onChange={setFormation} required />
                            <button id="register" type="submit" className={`bg-tshare ${button}`}>Cadastrar</button>
                        </form>
                    </>
                }
            </div>
        </div>
    )
}

export default Login;