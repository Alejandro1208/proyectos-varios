import React from 'react';
import { ArrowUpRight, Building2, MapPin, Compass, Users, PhoneCall, Sparkles } from 'lucide-react';
import companyData from '../data/companyData.json';
import { withBasePath } from '../utils/assetPath';

interface ServicesSectionProps {
  onOpenQuoteModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuoteModal }) => {
  const whatsappNumber = companyData.company.whatsappNumber;

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'corporativo':
        return <Building2 className="w-6 h-6 text-blue-400" />;
      case 'receptivo':
        return <Compass className="w-6 h-6 text-indigo-400" />;
      case 'recreativo':
        return <Users className="w-6 h-6 text-emerald-400" />;
      default:
        return <Building2 className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="servicios" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800/60 inline-block mb-3">
            Nuestros Servicios Especializados
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Soluciones de Traslado Adaptadas a sus Necesidades
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Atendemos requerimientos corporativos recurrentes, traslados turísticos internacionales de delegaciones y eventos grupales masivos.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {companyData.services.map((service) => {
            const whatsappServiceUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(service.whatsappMessage)}`;

            return (
              <div
                key={service.id}
                className="rounded-3xl bg-slate-950 border border-slate-800 hover:border-slate-700 shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div>
                  {/* Service Image Header */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={withBasePath(service.image)}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 shadow-md flex items-center gap-1.5">
                      {getServiceIcon(service.category)}
                      <span>{service.badgeText}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-400">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 sm:p-8 pt-0 space-y-3">
                  <a
                    href={whatsappServiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-emerald-400/30"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Contratar Servicio vía WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={onOpenQuoteModal}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs border border-slate-800 transition-colors"
                  >
                    Solicitar Cotización por Formulario
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
