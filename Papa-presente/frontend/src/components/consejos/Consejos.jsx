import React, { useEffect, useState } from 'react';
import { mockApi } from '../auth/mockApi';

const Consejos = () => {
    const [consejos, setConsejos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConsejos = async () => {
            try {
                // Usamos el mockApi para obtener los datos
                const data = await mockApi.getConsejos();
                setConsejos(data);
            } catch (error) {
                console.error("Error al cargar consejos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConsejos();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl text-gray-600">Cargando consejos...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container p-4 mx-auto">
                <h1 className="mb-4 text-3xl font-bold text-gray-800">Consejos para la Crianza</h1>
                
                {consejos.length === 0 ? (
                    <p className="text-gray-600">No hay consejos disponibles por el momento.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {consejos.map((consejo) => (
                            <div key={consejo.id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-xl font-bold text-gray-800">{consejo.titulo}</h2>
                                    <span className="px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
                                        {consejo.categoria}
                                    </span>
                                </div>
                                <p className="mb-4 text-gray-600">{consejo.descripcion}</p>
                                <div className="text-sm text-gray-500 border-t pt-2 mt-2">
                                    Edad recomendada: {consejo.edad_min_meses} - {consejo.edad_max_meses} meses
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Consejos;
