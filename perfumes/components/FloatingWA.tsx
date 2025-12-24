
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface Props {
  phone: string;
}

const FloatingWA: React.FC<Props> = ({ phone }) => {
  const handleClick = () => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      aria-label="WhatsApp Contact"
    >
      <MessageCircle size={28} fill="currentColor" />
      <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1.5 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        ¡Hablemos por WhatsApp!
      </span>
    </button>
  );
};

export default FloatingWA;
