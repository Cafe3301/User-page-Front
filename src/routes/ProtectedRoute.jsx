import React from 'react';
import { Navigate } from 'react-router-dom';

// Este componente verifica se o usuário está autenticado
const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        // Se não estiver autenticado, redireciona para a página de login
        return <Navigate to="/login" />;
    }

    // Se estiver autenticado, renderiza a rota protegida
    return children;
};

export default ProtectedRoute;
