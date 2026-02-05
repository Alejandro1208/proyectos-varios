
import React from 'react';

interface WhatsAppButtonProps {
  url: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25d366] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <i className="fab fa-whatsapp text-3xl"></i>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out font-bold">
        ¿Cómo podemos ayudarte?
      </span>
    </a>
  );
};

export default WhatsAppButton;
