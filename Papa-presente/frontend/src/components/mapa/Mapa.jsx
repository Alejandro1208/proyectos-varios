import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Mapa = () => {
    const [plazas, setPlazas] = useState([]);

    useEffect(() => {
        const fetchPlazas = async () => {
            try {
                const response = await fetch('http://localhost/padre-presente/backend/api/plazas');
                const data = await response.json();
                setPlazas(data);
            } catch (error) {
                console.error('Error fetching plazas:', error);
            }
        };

        fetchPlazas();
    }, []);

    const position = [-34.6037, -58.3816]; // Buenos Aires

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">Mapa de Plazas</h1>
            <MapContainer center={position} zoom={13} style={{ height: '70vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {plazas.map((plaza) => (
                    <Marker key={plaza.id} position={[plaza.latitud, plaza.longitud]}>
                        <Popup>
                            <h2 className="text-lg font-bold">{plaza.nombre}</h2>
                            <p>Estado: {plaza.estado}</p>
                            <p>{plaza.notas}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Mapa;
