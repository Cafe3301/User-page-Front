import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userCPF = localStorage.getItem('userCPF');

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="initial-circle">
                    {userName.charAt(0).toUpperCase()}
                </div>
                <h1>{userName}</h1>
                <p><strong>Email:</strong> {userEmail}</p>
                <p><strong>CPF:</strong> {userCPF}</p>
                <div className="view-appointments">
                    <Link to="/appointments">
                        <button>Ver Meus Agendamentos</button>
                    </Link>
                </div>
            </div>

            <footer>
                <Link to="/dashboard">
                    <div>
                        <img className="footer-icon" src="/src/assets/home.svg" alt="home-footer" />
                    </div>
                </Link>
                <Link to="/map">
                    <div>
                        <img className="footer-icon" src="/src/assets/map.svg" alt="map-footer" />
                    </div>
                </Link>
                <Link to="/profile">
                    <div>
                        <img className="footer-icon" src="/src/assets/user.svg" alt="user-footer" />
                    </div>
                </Link>
            </footer>
        </div>
    );
};

export default Profile;
