import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockApi } from './mockApi';

const Login = () => {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('123');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Usamos mockApi en lugar de fetch
            const response = await mockApi.login(email, password);
            
            // Si llega aquí es porque el login fue exitoso (si no, mockApi lanza error)
            localStorage.setItem('user', JSON.stringify(response.user));
            
            // Usamos navigate para una transición más fluida
            navigate('/consejos');

        } catch (error) {
            console.error('Error during login:', error);
            alert(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800">Bienvenido a Padre Presente</h1>
                <p className="text-center text-gray-600">Crianza de Supervivencia: práctico, rápido y sin vueltas.</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-gray-600">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
