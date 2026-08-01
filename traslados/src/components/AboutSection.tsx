import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, ShieldCheck, Clock, CheckCircle2, ChevronRight, Award, Zap, PhoneCall } from 'lucide-react';
import companyData from '../data/companyData.json';
import { withBasePath } from '../utils/assetPath';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quienes-somos' | 'flota-activa'>('quienes-somos');

  return (
    <section id="nosotros" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-4 py-1.5 rounded-full border border-blue-800/60 inline-block mb-3">
            Nuestra Identidad & Qué Hacemos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Especialistas en Movilidad Corporativa y Traslados Masivos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {companyData.company.aboutText}
          </p>
        </div>

        {/* 3 SPRINTER VANS ANIMATED ARRIVAL & ALIGNMENT SHOWCASE */}
        <div className="mb-20 bg-slate-950/80 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span>Nuestra Flota en Acción: Mercedes-Benz Sprinter 516</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Despliegue coordinado de unidades idénticas para traslados corporativos de hasta 60 pasajeros en simultáneo.
            </p>
          </div>

          {/* ROAD & VANS OVERLAY CONTAINER */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 group">
            
            {/* Background Image Layer */}
            <img 
              src={withBasePath('/img/fondo-de-camionetas.png')} 
              alt="Fondo de Camionetas" 
              className="w-full h-auto block object-cover rounded-2xl"
            />

            {/* Overlaid Transparent PNGs - Arrival sequence: 1. Derecha -> 2. Centro -> 3. Izquierda */}
            
            {/* 1. Camioneta Derecha (Llega primero) */}
            <motion.img 
              src={withBasePath('/img/camioneta-derecha.png')} 
              alt="Camioneta Derecha" 
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2, once: false }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            />

            {/* 2. Camioneta Centro (Llega segundo) */}
            <motion.img 
              src={withBasePath('/img/camioneta-centro.png')} 
              alt="Camioneta Centro" 
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.2, once: false }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            />

            {/* 3. Camioneta Izquierda (Llega al final) */}
            <motion.img 
              src={withBasePath('/img/camioneta-izquierda.png')} 
              alt="Camioneta Izquierda" 
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2, once: false }}
              transition={{ duration: 0.9, delay: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
            />

          </div>

        </div>

        {/* Features & Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {companyData.aboutFeatures.map((feat, index) => {
            const icons = {
              Building2: <Building2 className="w-8 h-8 text-blue-400" />,
              ShieldCheck: <ShieldCheck className="w-8 h-8 text-indigo-400" />,
              Clock: <Clock className="w-8 h-8 text-emerald-400" />,
            };
            const iconEl = icons[feat.icon as keyof typeof icons] || <Award className="w-8 h-8 text-blue-400" />;

            return (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-blue-900/10"
              >
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 w-fit mb-6 shadow-inner">
                  {iconEl}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Corporate Partnership Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900/80 via-slate-900 to-indigo-900/80 p-8 sm:p-12 border border-blue-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              ¿Representa a una empresa o parque industrial?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              Coordinamos reuniones presenciales o virtuales con su departamento de Recursos Humanos o Logística para estructurar un plan de transporte a medida con facturación corporativa.
            </p>
          </div>
          <a
            href={`https://wa.me/${companyData.company.whatsappNumber}?text=${encodeURIComponent('Hola, me comunico en representación de una empresa para coordinar una reunión de logística corporativa.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border border-emerald-400/30"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Coordinar Reunión Corporativa</span>
          </a>
        </div>

      </div>
    </section>
  );
};
