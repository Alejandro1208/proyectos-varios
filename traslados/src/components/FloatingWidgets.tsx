import React from 'react';
import { PhoneCall } from 'lucide-react';
import companyData from '../data/companyData.json';

export const FloatingWidgets: React.FC = () => {
  const company = companyData.company;
  const whatsappUrl = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(company.whatsappDefaultMessage)}`;

  return (
    <>
      {/* Floating WhatsApp CTA Button - Bottom Right */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        aria-label="Abrir chat de WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold shadow-2xl shadow-emerald-900/50 transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 group"
      >
        <div className="relative">
          <PhoneCall className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
        </div>
        <span className="hidden sm:inline-block text-sm font-bold tracking-wide">
          Atención WhatsApp
        </span>
      </a>
    </>
  );
};
