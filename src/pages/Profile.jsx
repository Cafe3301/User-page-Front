import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { TfiMapAlt, TfiPanel, TfiUser, TfiAgenda } from "react-icons/tfi";

const Profile = () => {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userCPF = localStorage.getItem('userCPF');
    const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || null); // Estado para armazenar a URL da imagem

    // Função para lidar com a mudança de imagem
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                localStorage.setItem('profileImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleCircleClick = () => {
        document.getElementById('fileInput').click();
    };


    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="initial-circle" onClick={handleCircleClick}>
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="profile-image" />
                    ) : (
                        <span className="initials">{userName ? userName.charAt(0).toUpperCase() : "U"}</span>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <h1 className='user-name'>{userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : "Usuário"}</h1>
                <p><strong>Email:</strong> {userEmail}</p>
                <p><strong>CPF:</strong> {userCPF}</p>
                <div className="view-appointments">
                    <Link to="/appointments">
                        <button className='footer-button'> <TfiAgenda className='footer-icon' />Ver Meus Agendamentos</button>
                    </Link>
                </div>
            </div>

            <footer>
                <Link to="/dashboard">
                    <div>
                        <div className="footer-button">
                            <TfiPanel className="footer-icon" />
                        </div>
                        <p>Painel</p>
                    </div>
                </Link>
                <Link to="/map">
                    <div>
                        <div className="footer-button">
                            <TfiMapAlt className="footer-icon" />
                        </div>
                        <p>Mapa</p>
                    </div>
                </Link>
                <Link to="/profile">
                    <div>
                        <div className="footer-button">
                            <TfiUser className='footer-icon' />
                        </div>
                        <p>Perfil</p>
                    </div>
                </Link>
            </footer>
        </div>
    );
};

export default Profile;
