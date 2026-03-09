import React, { useState, useEffect } from 'react';

const Habitos = () => {
    const [habitos, setHabitos] = useState(null);
    const [hijoId, setHijoId] = useState(1); // Assuming a child with ID 1
    const today = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        const fetchHabitos = async () => {
            try {
                const response = await fetch(`http://localhost/padre-presente/backend/api/habitos/${hijoId}/${today}`);
                const data = await response.json();
                setHabitos(data);
            } catch (error) {
                console.error('Error fetching habitos:', error);
            }
        };

        fetchHabitos();
    }, [hijoId, today]);

    const handleCheckboxChange = async (habit) => {
        const updatedHabitos = { ...habitos, [habit]: !habitos[habit] };
        setHabitos(updatedHabitos);

        try {
            await fetch(`http://localhost/padre-presente/backend/api/habitos/${habitos.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedHabitos),
            });
        } catch (error) {
            console.error('Error updating habitos:', error);
        }
    };

    if (!habitos) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">Itinerario de Hábitos Diarios</h1>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-lg">Lavado de dientes</span>
                    <input
                        type="checkbox"
                        className="w-6 h-6 text-indigo-600 rounded form-checkbox"
                        checked={habitos.lavado_dientes}
                        onChange={() => handleCheckboxChange('lavado_dientes')}
                    />
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-lg">Límite de pantallas</span>
                    <input
                        type="checkbox"
                        className="w-6 h-6 text-indigo-600 rounded form-checkbox"
                        checked={habitos.limite_pantallas}
                        onChange={() => handleCheckboxChange('limite_pantallas')}
                    />
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-lg">30 min de juego puro</span>
                    <input
                        type="checkbox"
                        className="w-6 h-6 text-indigo-600 rounded form-checkbox"
                        checked={habitos.juego_puro}
                        onChange={() => handleCheckboxChange('juego_puro')}
                    />
                </div>
            </div>
        </div>
    );
};

export default Habitos;
