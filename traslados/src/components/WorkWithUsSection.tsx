import React from 'react';
import { Mail, Phone, Briefcase, CheckCircle2, Send, FileCheck } from 'lucide-react';
import companyData from '../data/companyData.json';

export const WorkWithUsSection: React.FC = () => {
  const recruitmentEmail = companyData.company.recruitmentEmail || companyData.company.email;
  const phone = companyData.company.phone;
  const formattedPhone = companyData.company.formattedPhone;

  return (
    <section id="trabaja-con-nosotros" className="py-20 bg-slate-950 text-white relative border-t border-slate-800">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Flyer Card Container */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Job Description & Requirements */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Búsqueda Laboral Activa</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Sumate a Nuestro Equipo de Choferes Profesionales
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Estamos en la búsqueda constante de conductores capacitados para la operación de nuestras unidades <span className="text-blue-300 font-semibold">Mercedes-Benz Sprinter 516</span> en servicios corporativos, industriales y traslados ejecutivos.
              </p>

              {/* Requirements Checklist */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Requisitos Principales
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {companyData.driverRequirements.map((req, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">{req.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{req.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Prominent Contact Card to Send CV */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl space-y-6">
              
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Envío de CV</h3>
                  <p className="text-xs text-slate-400">Comunícate directamente con nuestro equipo de selección</p>
                </div>
              </div>

              {/* Email Contact Box */}
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 hover:border-blue-500/40 transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Correo Electrónico para CV</span>
                </div>
                <a 
                  href={`mailto:${recruitmentEmail}`}
                  className="text-base sm:text-lg font-bold text-white hover:text-blue-300 transition-colors break-all flex items-center gap-2"
                >
                  <span>{recruitmentEmail}</span>
                  <Send className="w-4 h-4 text-blue-400 shrink-0" />
                </a>
                <p className="text-[11px] text-slate-400">
                  Adjunta tu Curriculum Vitae en formato PDF o Word indicando tus datos de contacto y licencia.
                </p>
              </div>

              {/* Phone Contact Box */}
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Teléfono de Contacto</span>
                </div>
                <a 
                  href={`tel:${formattedPhone}`}
                  className="text-base sm:text-lg font-bold text-white hover:text-emerald-300 transition-colors block"
                >
                  {phone}
                </a>
                <p className="text-[11px] text-slate-400">
                  Llamadas o mensajes para consultas sobre vacantes y condiciones laborales.
                </p>
              </div>

              {/* Mailto Button */}
              <a
                href={`mailto:${recruitmentEmail}?subject=${encodeURIComponent('Postulación Chofer Sprinter 516')}`}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar CV por Correo Electrónico</span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
