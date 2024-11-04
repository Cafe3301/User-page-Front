import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Logo.png'; // Assuming you want to keep the logo

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('As senhas não conferem');
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/auth/reset-password/${token}`, { 
                newPassword, 
                confirmpassword: confirmPassword 
            });            
            setMessage(response.data.msg);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Erro ao redefinir a senha.');
            } else {
                setMessage('Erro ao redefinir a senha.');
            }
        }
    };

    return (
        <div className='password-page'>
            <div className="header-container">
                <img className='photo' src={Logo} alt="logo photo" />
            </div>
            <h1 className='titulo__inicio'>Redefinir Senha</h1>
            <div className='form-card'>
                <form onSubmit={handleSubmit}>
                    <input 
                        className='input-group'
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nova Senha"
                        required
                    />
                    <input 
                        className='input-group'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme a Nova Senha"
                        required
                    />
                    <button type="submit">Redefinir Senha</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
