import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Appointments.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const userCPF = localStorage.getItem('userCPF');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/appointments/user/${userCPF}`);
                setAppointments(response.data);
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
            }
        };

        if (userCPF) {
            fetchAppointments();
        }
    }, [userCPF]);

    return (
        <div className="appointments-container">
            <h1>Meus Agendamentos</h1>
            {appointments.length === 0 ? (
                <p>Você não possui agendamentos.</p>
            ) : (
                <div className="appointments-list">
                    <ul>
                        {appointments.map(appointment => (
                            <li key={appointment._id}>
                                <p><strong>Data:</strong> {new Date(appointment.appointmentDate).toLocaleString()}</p>
                                <p><strong>Carro:</strong> {appointment.carId.name}</p> {/* Acesse a propriedade correta aqui */}
                                <p><strong>Status:</strong> {appointment.status}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
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
                <Link to="/Profile">
                    <div>
                        <img className="footer-icon" src="/src/assets/user.svg" alt="user-footer" />
                    </div>
                </Link>
            </footer>
        </div>
    );
};

export default Appointments;
