import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook para redirecionar

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password
            });

            setMessage(response.data.msg);

            // Armazena o token ou estado de autenticação
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userEmail', response.data.user.email);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userCPF', response.data.user.cpf);

            // Redirecionar para a página protegida
            navigate('/dashboard'); // Mude para o caminho da página que você deseja proteger
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.msg);
            } else {
                setMessage('Erro ao conectar com o servidor');
            }
        }
    };

    return (
        <div className='login-page'>
            <div className="container">
                <div className="header-container">
                    <img className='photo' src="/src/assets/car.svg" alt="car photo" />
                </div>
                <div className="form-card">
                    <h1 className='titulo__inicio'>Welcome Back</h1>
                    <p className='paragrafo__inicio'>Welcome back, we missed you</p>
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
                            <p className='Forgot-password'>
                                <Link to="/reset-password">Esqueceu a senha?</Link>
                            </p>

                        </div>
                        <button type="submit">Login</button>
                    </form>
                    {message && <p>{message}</p>}
                    <p className='login'>
                        Não tem uma conta? <Link to="/register">Crie uma</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
