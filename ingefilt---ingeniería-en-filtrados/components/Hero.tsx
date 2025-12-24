import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
          alt="Industrial Filtration Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-blue-900/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="sm:max-w-2xl">
          <div className="inline-block px-4 py-1 mb-4 border border-blue-400/30 rounded-full bg-blue-900/30 backdrop-blur-sm">
            <span className="text-blue-300 font-semibold tracking-wide text-xs uppercase">Tecnología de Ranura Continua</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Filtración de Precisión para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Alta Eficiencia</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 mb-10 leading-relaxed font-light">
            Especialistas en filtros de acero inoxidable tipo Wedge Wire. 
            Soluciones duraderas y anti-obstrucción para la industria minera, pozos de agua y procesos alimenticios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#product" 
              onClick={(e) => scrollToSection(e, 'product')}
              className="group flex items-center justify-center px-8 py-4 text-base font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Ver Soluciones
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://wa.me/5491155129684" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-8 py-4 text-base font-bold rounded-lg text-white border border-slate-400 hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Contactar Experto
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};