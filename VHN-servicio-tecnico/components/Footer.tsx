
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo />
          
          <div className="flex gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#inicio" className="hover:text-blue-600 transition-colors">Inicio</a>
            <a href="#nosotros" className="hover:text-blue-600 transition-colors">Nosotros</a>
            <a href="#servicios" className="hover:text-blue-600 transition-colors">Servicios</a>
            <a href="#contacto" className="hover:text-blue-600 transition-colors">Contacto</a>
          </div>

          <p className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} VHN Servicio Técnico. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
