import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Logo from '../assets/Logo.png'; 
import { HiLockClosed} from "react-icons/hi2";
import { BiSolidUser } from "react-icons/bi";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                email,
                password
            });            
        
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userEmail', response.data.user.email);
            localStorage.setItem('userCPF', response.data.user.cpf);
    
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                console.error("Erro da resposta:", error.response.data); // Loga o erro
                setMessage(error.response.data.msg);
            } else {
                console.error("Erro ao conectar com o servidor:", error); // Loga o erro geral
                setMessage('Erro ao conectar com o servidor');
            }
        }
    };

    return (
        <div className='login-page'>
            <div className="container">
                <div className="header-container">
                    <img className='photo' src={Logo} alt="logo photo" />
                </div>
                <h1 className='titulo__inicio'>Bem-Vindo</h1>
                <p className='paragrafo__inicio'>É bom tê-lo de volta</p>
                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Seu Email</label>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <BiSolidUser className='icon' />
                        </div>
                        <div className="input-group">
                            <label>Sua Senha</label>
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <HiLockClosed className='icon'/>
                        </div>
                        <p className='forgot-password'>
                                <Link to="/forgot-password">Esqueceu a senha?</Link>
                            </p>
                        <button type="submit">Entrar</button>
                    </form>
                    {message && <p>{message.trim()}</p>} {}
                    <p className='register'>
                        Não tem uma conta? <Link to="/register">Crie uma</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
