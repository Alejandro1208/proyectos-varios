import React, { useState } from 'react';

const Perfil = () => {
    const [nombreHijo, setNombreHijo] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle create child logic here
        console.log(nombreHijo, fechaNacimiento);
    };

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">Perfil del Hijo</h1>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre del niño</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={nombreHijo}
                            onChange={(e) => setNombreHijo(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Perfil;
