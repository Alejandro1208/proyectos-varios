import React from 'react';
import { ArrowDown, Users, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import companyData from '../data/companyData.json';
import { withBasePath } from '../utils/assetPath';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#servicios');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-slate-950">
      
      {/* Background Image Layers / Animated Banner Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Base Road / Sky background */}
        <img
          src={withBasePath('/img/fondo-de-camionetas.png')}
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop";
          }}
          alt="Fondo de Camionetas de Traslado"
          className="w-full h-full object-cover object-center"
        />

        {/* 1. Camioneta Derecha Layer */}
        <motion.img 
          src={withBasePath('/img/camioneta-derecha.png')} 
          alt="Minibús Derecha" 
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.1, once: false }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        />

        {/* 2. Camioneta Centro Layer */}
        <motion.img 
          src={withBasePath('/img/camioneta-centro.png')} 
          alt="Minibús Centro" 
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ amount: 0.1, once: false }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        />

        {/* 3. Camioneta Izquierda Layer */}
        <motion.img 
          src={withBasePath('/img/camioneta-izquierda.png')} 
          alt="Minibús Izquierda" 
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.1, once: false }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        />

        {/* Dark vignette gradient overlays for contrast and text legibility */}
        <div className="absolute inset-0 bg-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto text-center flex flex-col items-center">
        
        {/* Main Hero Copy */}
        <div className="space-y-8 max-w-3xl text-center">

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            {companyData.company.shortName}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-200 mt-2">
              Traslados Especiales & De Alta Gama
            </span>
          </h1>

          {/* Short Description */}
          <p className="text-base sm:text-xl lg:text-2xl text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            {companyData.company.heroDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            
            {/* Primary CTA: Ver Servicios */}
            <a
              href="#servicios"
              onClick={scrollToServices}
              id="hero-see-services-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-xl shadow-blue-900/50 transition-all hover:scale-[1.02] border border-blue-400/30"
            >
              <span>Ver Servicios</span>
              <ChevronRight className="w-5 h-5" />
            </a>

            {/* Secondary CTA: Solicitar Cotización */}
            <button
              onClick={onOpenQuoteModal}
              id="hero-quote-modal-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-semibold text-base border border-slate-700 shadow-xl backdrop-blur-md transition-all hover:border-slate-500"
            >
              <Users className="w-5 h-5 text-blue-400" />
              <span>Cotizar Traslado Grupal</span>
            </button>

          </div>

        </div>

      </div>

      {/* Down Arrow indicator */}
      <div className="relative z-10 flex flex-col items-center pt-6">
        <a 
          href="#nosotros" 
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#nosotros')?.scrollIntoView({ behavior: 'smooth' });
          }} 
          className="text-slate-400 hover:text-white transition-colors p-2 rounded-full bg-slate-900/60 border border-slate-800"
          aria-label="Ir a la sección Nosotros"
        >
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>

    </section>
  );
};

