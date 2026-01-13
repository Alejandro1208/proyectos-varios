
import React, { useState, useEffect } from 'react';
import { Service } from '../types';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!service || service.carouselImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % service.carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [service]);

  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [service]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-4xl max-h-full overflow-y-auto rounded-[2.5rem] shadow-2xl animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-slate-800 transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Carousel Section */}
          <div className="lg:w-1/2 relative h-[300px] lg:h-auto min-h-[400px]">
            {service.carouselImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${service.title} - ${idx}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            
            {/* Carousel Dots */}
            {service.carouselImages.length > 1 && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {service.carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                  ></button>
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-10 lg:p-14">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-black uppercase tracking-widest mb-4">
              {service.category}
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">{service.title}</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {service.fullDescription}
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white">
                  <i className="fas fa-check"></i>
                </div>
                <span className="font-bold text-slate-700">Garantía escrita de reparación</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500 text-white">
                  <i className="fas fa-clock"></i>
                </div>
                <span className="font-bold text-slate-700">Atención de urgencias 24 hs</span>
              </div>
            </div>

            <a
              href="#contacto"
              onClick={onClose}
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-all hover:-translate-y-1 shadow-lg shadow-blue-200"
            >
              Pedir Presupuesto
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
