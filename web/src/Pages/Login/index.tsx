import React, { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import './styles.css';

const Login = () => {
    const history = useHistory();

    const [isRegister, setIsRegister] = useState(false);

    function handleToggleOnRegisterForm() {
        setIsRegister(true);
    }

    function handleToggleOffRegisterForm() {
        setIsRegister(false);
    }

    function handleHomePage() {
        history.push('/Home');
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
                            <Input placeholder="E-mail" type="text" />
                            <Input placeholder="Senha" type="password" />
                            <div className="rememberMe">
                                <input type="checkbox" />
                                <label htmlFor="">Lembrar usuário</label>
                            </div>
                            <Button text="Entrar" style={{ background: '#37c77f99' }} onClick={handleHomePage} />
                            <hr className="separator" />
                            <Button text="Cadastrar" style={{ background: '#FFD66699', width: '90%' }} onClick={handleToggleOnRegisterForm} />
                        </>
                    }
                    {isRegister &&
                        <>
                            <p className="backButton" onClick={handleToggleOffRegisterForm}><FiChevronLeft size={25} color="#FFF" />Voltar</p>
                            <Input placeholder="Nome" type="text" />
                            <Input placeholder="Data de nascimento" type="text" />
                            <Input placeholder="E-mail" type="text" />
                            <Input placeholder="Senha" type="password" />

                            <hr className="separator" />
                            
                            <Input placeholder="Escola" type="text" />
                            <Input placeholder="Disciplina" type="text" />
                            <Button text="Cadastrar" style={{ background: '#37c77f99', marginTop: '50px' }} />
                        </>
                    }
                </div>                
            </div>
        </div>
    )
}

export default Login;