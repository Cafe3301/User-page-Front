import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importando o Link
import './Dashboard.css';

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
        appointmentDate: '',
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
                const response = await axios.get(`http://localhost:5000/api/cars/user/${userCPF}`);
                setCars(response.data);
            } catch (error) {
                console.error("Erro ao buscar os carros:", error);
            }
        };
        fetchCars();
    }, [userCPF]);

    const fetchQueueCounts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cars/queue/count');
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
            appointmentDate: '', 
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/appointments', appointmentData);
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
                        <h2>Olá {userName.charAt(0).toUpperCase() + userName.slice(1)},</h2>
                        <p>Está tudo bem? Hoje é um belo, <span>dia para lavar o seu carro</span></p>
                    </div>
                </div>
            </div>

            <div className='container-car'>
                <div className="car-section">
                    {cars.length === 0 ? (
                        <div className='non-car'>
                            <img src="/src/assets/Carpool-pana.svg" alt="car photo" />
                            <p>Você não possui nenhum carro <span>sendo lavado no momento :(</span></p>
                        </div>
                    ) : (
                        cars.map(car => (
                            <div key={car._id} className="car-status-container">
                                <img className='car-wish' src="/src/assets/car-wish.svg" alt="car wish photo" />
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
                    <h1>{queueCount}</h1>
                    <p>veículos na fila</p>
                    <button className="button" onClick={handleModalOpen}>Fazer agendamento?</button>
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
                                value={appointmentData.userName} 
                                readOnly 
                            />
                            <input 
                                type="text" 
                                name="userCPF" 
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
                            <select 
                                name="carId" 
                                value={appointmentData.carId} 
                                onChange={handleInputChange} 
                                required
                            >
                                <option value="">Selecione um carro</option>
                                {cars.map(car => (
                                    <option key={car._id} value={car._id}>{car.name}</option>
                                ))}
                            </select>
                            <input 
                                type="datetime-local" 
                                name="appointmentDate" 
                                value={appointmentData.appointmentDate} 
                                onChange={handleInputChange} 
                                required 
                            />
                            <button className='button-confirm' type="submit">Agendar</button>
                            <button className='button-cancel' type="button" onClick={handleModalClose}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}

            <footer>
                <Link to="/dashboard"><div><img className="footer-icon" src="/src/assets/home.svg" alt="home-footer" /></div></Link>
                <Link to="/map"><div><img className="footer-icon" src="/src/assets/map.svg" alt="map-footer" /></div></Link>
                <Link to="/Profile"><div><img className="footer-icon" src="/src/assets/user.svg" alt="user-footer" /></div></Link>
            </footer>
        </div>
    );
};

export default Dashboard;
