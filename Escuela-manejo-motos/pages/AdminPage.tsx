import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../hooks/useSite';
import CourseManager from '../components/admin/CourseManager';
import UserManager from '../components/admin/UserManager';
import SiteIdentityManager from '../components/admin/SiteIdentityManager';
import CategoryManager from '../components/admin/CategoryManager';
import { LogoutIcon } from '../components/Icons';
import HeroManager from '../components/admin/HeroManager';
import AboutManager from '../components/admin/AboutManager';
import InfoBoxManager from '../components/admin/InfoBoxManager';

type AdminTab = 'courses' | 'categories' | 'users' | 'identity' | 'hero' | 'about' | 'infoBoxes';

const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('courses');
    const { logout, siteIdentity } = useSite();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'courses':
                return <CourseManager />;
            case 'categories':
                return <CategoryManager />;
            case 'users':
                return <UserManager />;
            case 'identity':
                return (
                    <>
                        <SiteIdentityManager />
                    </>
                );
            case 'hero':
                return <HeroManager />;
            case 'about':
                return <AboutManager />;
            case 'infoBoxes':
                return <InfoBoxManager />;
            default:
                return null;
        }
    };

    if (!siteIdentity) {
        return <div>Cargando panel...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        <img className="h-10 w-auto" src={siteIdentity.logo} alt="Logo" />
                        <span className="font-bold text-gray-800 text-lg sm:text-xl">Panel de Administración</span>
                    </div>
                    {/* --- INICIO DE LA CORRECCIÓN 1 --- */}
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        <a href="/#/"
                            className="py-1.5 px-3 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto text-center sm:text-sm">
                            Ver Sitio
                        </a>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center py-1.5 px-3 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors w-full sm:w-auto sm:text-sm">
                            <LogoutIcon className="w-5 h-5 sm:mr-1" />
                            <span className="hidden sm:inline">Cerrar Sesión</span>
                        </button>
                    </div>
                    {/* --- FIN DE LA CORRECCIÓN 1 --- */}
                </div>
            </header>
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mb-6 border-b border-gray-200">
                    {/* --- INICIO DE LA CORRECCIÓN 2 --- */}
                    <nav className="-mb-px flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8" aria-label="Tabs">
                    {/* --- FIN DE LA CORRECCIÓN 2 --- */}
                        <button
                            onClick={() => setActiveTab('hero')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'hero' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Hero
                        </button>
                        {/* Nota: La clase de este botón era "..." la he corregido para que sea igual al resto.
                        */}
                        <button onClick={() => setActiveTab('infoBoxes')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'infoBoxes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                            Info Cursos
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'about' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Quiénes Somos
                        </button>
                        <button
                            onClick={() => setActiveTab('courses')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'courses' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Cursos
                        </button>
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'categories' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Categorías
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Usuarios
                        </button>
                        <button
                            onClick={() => setActiveTab('identity')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'identity' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Identidad del Sitio
                        </button>
                    </nav>
                </div>
                <div>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminPage;