
import React from 'react';

const WhatsAppButton: React.FC<{ phone: string }> = ({ phone }) => {
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-[#25D366] text-white flex items-center justify-center rounded-full shadow-2xl shadow-green-400/50 transition-all hover:scale-110 active:scale-95 animate-bounce-slow"
    >
      <i className="fab fa-whatsapp text-4xl"></i>
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">1</span>
    </a>
  );
};

export default WhatsAppButton;
