import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import Logo from '../assets/Logo.png'


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            confirmpassword,
            phone,
            cpf
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData);
            setMessage(response.data.msg);


            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userEmail', response.data.user.email);
            localStorage.setItem('userCPF', response.data.user.cpf);

            {
                message && (
                    <p className={messageType === 'error' ? 'error-message' : 'success-message'}>
                        {message}
                    </p>
                )
            }


            navigate('/dashboard');
            setMessageType('success');
            setMessage('Operação realizada com sucesso!');
        } catch (error) {
            if (error.response && error.response.data) {
                setMessageType('error');
                setMessage(error.response.data.msg);
            } else {
                setMessageType('error');
                setMessage('Erro ao conectar com o servidor');
            }
        }
    };

    return (
        <div className="container">
            <div className="header-container">
                <img className='photo' src={Logo} alt="Person photo" />
                <h1 className='titulo__inicio'>Crie sua Conta e Comece Agora</h1>
                <p className='paragrafo__inicio'>Cadastre-se e agende sua lavagem com profissionais especializados.</p>
            </div>
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className='seu__nome'>Seu Nome</label>
                        <input
                            type="text"
                            placeholder="João Pedro da Silva"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className='seu__nome'>Seu Email</label>
                        <input
                            type="email"
                            placeholder="seuemail@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className='seu__nome'>Sua Senha</label>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className='seu__nome'>Confirme sua senha</label>
                        <input
                            type="password"
                            placeholder="Confirme sua senha"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className='seu__nome'>Seu Telefone</label>
                        <input
                            type="tel"
                            placeholder="61982828282"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            maxLength="11" // Limite para telefone
                        />
                    </div>
                    <div className="input-group">
                        <label className='seu__nome'>Seu CPF</label>
                        <input
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                            maxLength="14" // Limite para CPF
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p>{message.trim()}</p>} {/* Mensagem de feedback */}
                <p className='login'>
                    Já tem uma conta? <Link to="/login">Faça login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
