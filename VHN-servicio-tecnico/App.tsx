
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import SocialSidebar from './components/SocialSidebar';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import { SiteData } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<SiteData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargamos el JSON de forma dinámica para evitar errores de resolución de módulos
    // y permitir que el sitio sea escalable hacia una administración externa.
    fetch('./data.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al cargar los datos: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((json) => {
        setData(json as SiteData);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
          <i className="fas fa-exclamation-triangle text-3xl"></i>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">Ups! Algo salió mal</h1>
        <p className="text-slate-600 max-w-md mb-8">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Cargando VHN...</p>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Hero name={data.company.name} slogan={data.company.slogan} />
      
      <main>
        <About description={data.company.aboutText} />
        <Services services={data.services} />
        <ContactForm />
      </main>

      <Footer />
      
      {/* Componentes Fijos */}
      <SocialSidebar />
      <WhatsAppButton phone={data.company.whatsapp} />
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
