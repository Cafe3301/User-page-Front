import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../assets/Logo.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erro ao enviar o email.');
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
