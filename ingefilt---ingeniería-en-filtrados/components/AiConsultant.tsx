import React from 'react';
import { MessageCircle } from 'lucide-react';

// Replaced AI assistant with a direct WhatsApp button.
export const AiConsultant: React.FC = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/5491155129684?text=Hola,%20quisiera%20asesoramiento%20sobre%20filtros%20Ingefilt.', '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-4 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={22} />
      <span className="font-semibold">WhatsApp</span>
    </button>
  );
};
