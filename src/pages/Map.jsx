import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TfiMapAlt, TfiPanel, TfiUser } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import './Map.css';

const Map = () => {
    const position = [-15.7606581, -47.8744398]; // Posição inicial (exemplo: São Paulo)

    return (
        <div className="map-page">
            {/* Mapa */}
            <MapContainer center={position} zoom={13} className="map-container">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>Aqui está seu melhor Lava Jato <br /> Liatec.</Popup>
                </Marker>
            </MapContainer>

            {/* Rodapé */}
            <footer className="footer">
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
                            <TfiUser className="footer-icon" />
                        </div>
                        <p>Perfil</p>
                    </div>
                </Link>
            </footer>
        </div>
    );
};

export default Map;
