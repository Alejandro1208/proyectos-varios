
import React from 'react';

interface HeroProps {
  name: string;
  slogan: string;
}

const Hero: React.FC<HeroProps> = ({ name, slogan }) => {
  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2070"
          alt="Gastronomic Kitchen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-900/80"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-600/20 border border-blue-400/30 backdrop-blur-sm animate-fade-in">
            <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Servicio Técnico Especializado</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter drop-shadow-2xl leading-tight">
            {name}
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-10 font-medium max-w-2xl mx-auto drop-shadow-md">
            {slogan}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#servicios"
              className="w-full sm:w-auto px-10 py-5 bg-white text-blue-900 font-black rounded-2xl hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
            >
              Ver Servicios
            </a>
            <a
              href="#contacto"
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-600/30"
            >
              Pedir Presupuesto
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-gray-50 fill-current">
          <path d="M0 120H1440V46.6111C1322.61 14.5029 1198.81 0.444444 1074.1 0.444444C811.458 0.444444 593.542 61.2222 365.9 61.2222C241.189 61.2222 117.391 47.1638 0 15.0556V120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
