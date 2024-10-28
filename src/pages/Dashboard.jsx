import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { TfiMapAlt, TfiPanel, TfiUser, TfiAgenda } from "react-icons/tfi";
import CarPol from '../assets/Car-pool.svg';
import CarWish from '../assets/Car-wish.svg';

const Dashboard = () => {
    const [cars, setCars] = useState([]);
    const [queueCount, setQueueCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [appointmentData, setAppointmentData] = useState({
        userName: '',
        userCPF: '',
        userPhone: '',
        userEmail: '',
        carId: '',
        appointmentDate: null,
        status: 'Agendado'
    });

    const userName = localStorage.getItem('userName');
    const userCPF = localStorage.getItem('userCPF');

    useEffect(() => {
        const fetchCars = async () => {
            if (!userCPF) {
                console.error("CPF do usuário não encontrado.");
                return;
            }

            try {
                const apiUrl = import.meta.env.VITE_ADMIN_API_URL;
                const response = await axios.get(`${apiUrl}/cars/user/${userCPF}`);
                setCars(response.data);
            } catch (error) {
                console.error("Erro ao buscar os carros:", error);
            }
        };
        fetchCars();
    }, [userCPF]);

    const fetchQueueCounts = async () => {
        try {
            const apiUrl = import.meta.env.VITE_ADMIN_API_URL;
            const response = await axios.get(`${apiUrl}/cars/queue/count`);
            const { awaiting, washing } = response.data;
            const overall = awaiting + washing;
            setQueueCount(overall);
        } catch (error) {
            console.error('Erro ao buscar contagem de carros na fila:', error);
        }
    };

    useEffect(() => {
        fetchQueueCounts();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Aguardando':
                return 'red';
            case 'Lavando':
                return 'yellow';
            case 'Pronto':
                return 'green';
            default:
                return 'white';
        }
    };

    const handleModalOpen = () => {
        setModalOpen(true);
        setAppointmentData({
            userName,
            userCPF,
            userPhone: '',
            userEmail: '',
            carId: '',
            appointmentDate: null,
            status: 'Agendado'
        });
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (date) => {
        setAppointmentData(prevData => ({ ...prevData, appointmentDate: date }));
    };

    const filterTime = (time) => {
        const hour = time.getHours();
        return hour >= 8 && hour <= 18; // Permitir apenas das 8h às 18h
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_ADMIN_API_URL; // Usando a variável de ambiente
            const response = await axios.post(`${apiUrl}/appointments`, appointmentData);
            console.log('Agendamento criado:', response.data);
            handleModalClose();
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <div className="user-info">
                    <div className="greeting-container">
                        <h2>Olá {userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : 'Usuário'},</h2>
                        <p>Está tudo bem? Hoje é um belo dia para lavar o seu carro</p>
                    </div>
                </div>
            </div>

            <div className='container-car'>
                <div className="car-section">
                    {cars.length === 0 ? (
                        <div className='non-car'>
                            <img src={CarPol} alt="car photo" />
                            <p>Você não possui nenhum carro sendo lavado no momento</p>
                        </div>
                    ) : (
                        cars.map(car => (
                            <div key={car._id} className="car-status-container">
                                <img className='car-wish' src={CarWish} alt="car wish photo" />
                                <p><strong>Nome:</strong> {car.name}</p>
                                <p><strong>Modelo:</strong> {car.model}</p>
                                <p><strong>Ano:</strong> {car.year}</p>
                                <p>
                                    <strong>Status:   </strong>
                                    <span style={{ color: getStatusColor(car.status) }}>
                                        {car.status}
                                    </span>
                                </p>
                            </div>
                        ))
                    )}
                </div>

                <div className="queue-car">
                    <p>No momento possui</p>
                    <h1 className='numero-de-carros'>{Number.isNaN(queueCount) ? 0 : queueCount ?? 0}</h1>
                    <p>veículos na fila</p>
                    <div>
                        <button className="footer-button" onClick={handleModalOpen}>
                            <TfiAgenda className='footer-icon' />Fazer Agendamento?
                        </button>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Agendar Lavagem</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="userName"
                                placeholder="Nome Completo"
                                value={appointmentData.userName}
                                readOnly
                            />
                            <input
                                type="text"
                                name="userCPF"
                                placeholder="CPF"
                                value={appointmentData.userCPF}
                                readOnly
                            />
                            <input
                                type="text"
                                name="userPhone"
                                placeholder="Número de telefone"
                                value={appointmentData.userPhone}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="userEmail"
                                placeholder="Email"
                                value={appointmentData.userEmail}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="carId"
                                placeholder="Nome do Carro"
                                value={appointmentData.carId}
                                onChange={handleInputChange}
                                required
                            />
                            <DatePicker
                                selected={appointmentData.appointmentDate}
                                onChange={handleDateChange}
                                filterDate={date => date.getDay() === 6} // 6 representa sábado
                                filterTime={filterTime} // Filtra os horários
                                placeholderText="Selecione um sábado das 8h às 18h"
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="Pp"
                                required
                            />
                            <button className='button-confirm' type="submit">Agendar</button>
                            <button className='button-cancel' type="button" onClick={handleModalClose}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}

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

export default Dashboard;
