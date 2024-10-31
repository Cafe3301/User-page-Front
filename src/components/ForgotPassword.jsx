import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../assets/Logo.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL; // Usando a variável do Vite

        try {
            const response = await axios.post(`${apiUrl}/auth/forgot-password`, { email });
            console.log(response.data); // Log da resposta
            setMessage(response.data.message); // Acessando a propriedade correta
        } catch (error) {
            console.error(error); // Log do erro
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Erro ao enviar o email.');
            } else {
                setMessage('Erro ao enviar o email.');
            }
        }
    };

    return (
        <div className='password-page'>
            <div className="header-container">
                <img className='photo' src={Logo} alt="logo photo" />
            </div>
            <h1 className='titulo__inicio'>Recuperar Senha</h1>
            <div className='form-card'>
                <form onSubmit={handleSubmit}>
                    <input className='input-group'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        required
                    />
                    <button type="submit">Enviar Email</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
