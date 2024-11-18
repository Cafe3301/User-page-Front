import React from 'react';
import { Link } from 'react-router-dom';
import { TfiMapAlt, TfiPanel, TfiUser } from "react-icons/tfi";
import CustomMap from './CustomMap'; // Importe o componente do mapa
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            {/* Mapa Customizado */}
            <div className="map-container">
                <CustomMap />
            </div>

            {/* Rodapé */}
            <footer className="footer">
                <Link to="/dashboard">
                    <div className="footer-button">
                        <TfiPanel className="footer-icon" />
                        <p>Painel</p>
                    </div>
                </Link>
                <Link to="/map">
                    <div className="footer-button">
                        <TfiMapAlt className="footer-icon" />
                        <p>Mapa</p>
                    </div>
                </Link>
                <Link to="/profile">
                    <div className="footer-button">
                        <TfiUser className="footer-icon" />
                        <p>Perfil</p>
                    </div>
                </Link>
            </footer>
        </div>
    );
};

export default Dashboard;
