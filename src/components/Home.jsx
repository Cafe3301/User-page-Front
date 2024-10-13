import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Página Inicial</h2>
            <nav>
                <Link to="about">Sobre</Link>
                <Link to="dashboard">Painel</Link>
            </nav>
            <Outlet /> {/* Renderiza subpáginas */}
        </div>
    );
};

export default Home;