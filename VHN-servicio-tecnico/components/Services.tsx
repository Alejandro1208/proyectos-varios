
import React, { useState } from 'react';
import { Service } from '../types';
import ServiceModal from './ServiceModal';

interface ServicesProps {
  services: Service[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="servicios" className="py-24 bg-white scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Nuestras Soluciones</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Equipamiento Gastronómico Integral</h2>
          <p className="text-lg text-slate-600">Ofrecemos un servicio técnico especializado en el mantenimiento y reparación de todo tipo de maquinaria para restaurantes, hoteles y heladerías.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative bg-gray-50 rounded-[2.5rem] overflow-hidden cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200/50"
            >
              <div className="h-72 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <span className="text-white font-bold flex items-center gap-2">
                    Ver más detalles <i className="fas fa-plus-circle"></i>
                  </span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center justify-between mb-4">
                   <div className="px-3 py-1 bg-white text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
                    {service.category}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                <p className="text-slate-600 line-clamp-2 font-medium leading-relaxed">
                  {service.shortDescription}
                </p>
                <div className="mt-8 flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-wider">
                  Explorar servicio
                  <div className="w-8 h-px bg-blue-200 transition-all group-hover:w-12 group-hover:bg-blue-600"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </section>
  );
};

export default Services;
