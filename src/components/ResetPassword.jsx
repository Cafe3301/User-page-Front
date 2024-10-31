import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
            const apiUrl = import.meta.env.VITE_API_URL; // Usando a variável do Vite
            const response = await axios.post(`${apiUrl}/auth/reset-password/${token}`, { 
                newPassword, 
                confirmpassword: confirmPassword // Confirme que `confirmPassword` está correto aqui
            });            
            setMessage(response.data.msg);
        } catch (error) {
            console.error(error); // Log do erro
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Erro ao redefinir a senha.');
            } else {
                setMessage('Erro ao redefinir a senha.');
            }
        }
    };

    return (
        <div>
            <h1>Redefinir Senha</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nova Senha"
                    required
                />
                <input
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
    );
};

export default ResetPassword;
