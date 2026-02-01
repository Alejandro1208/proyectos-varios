
import React, { useState, useEffect } from 'react';
import { CONFIG } from '../constants';
import { Tag, Clock } from 'lucide-react';

interface Props {
  onViewCatalog: () => void;
  onOpenPromo: () => void;
  offerExpiresAt: number | null;
}

const Navbar: React.FC<Props> = ({ onViewCatalog, onOpenPromo, offerExpiresAt }) => {
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!offerExpiresAt) {
      setTimeLeft('');
      return;
    }
    const tick = () => {
      const now = Date.now();
      const diff = offerExpiresAt - now;
      if (diff <= 0) {
        setTimeLeft('');
        return;
      }
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [offerExpiresAt]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F2F2F2]/95 backdrop-blur-md border-b border-[#8C8C8C]/30 py-4 shadow-sm'
          : 'bg-gradient-to-b from-[#0E0F26]/85 to-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo - Minimalist Sans Serif */}
        <div className={`text-xl font-bold tracking-tight ${scrolled ? 'text-[#0D0D0D]' : 'text-[#F2F2F2]'}`}>
          GROWSE<span className="text-[#BF926B]">STORE</span>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-8">
          {timeLeft && (
            <div className={`flex flex-col items-end mr-2 ${scrolled ? 'text-red-600' : 'text-red-400'}`}>
              <span className="text-[10px] font-bold uppercase tracking-wider">¡Oferta por 2 horas!</span>
              <div className="text-sm font-bold flex items-center gap-1 animate-pulse">
                <Clock size={14} />
                <span>Expira en: {timeLeft}</span>
              </div>
            </div>
          )}
          <button
            onClick={onOpenPromo}
            className={`text-sm font-bold flex items-center gap-2 transition-colors ${
              scrolled ? 'text-[#BF926B] hover:text-[#0E0F26]' : 'text-[#BF926B] hover:text-white'
            }`}
          >
            <Tag size={16} />
            <span className="hidden sm:inline">Tengo un cupón</span>
          </button>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-sm font-medium transition-colors ${
              scrolled ? 'text-[#0E0F26] hover:text-[#BF926B]' : 'text-[#F2F2F2] hover:text-[#F2F2F2] opacity-80'
            }`}
          >
            Inicio
          </button>
          <button 
            onClick={onViewCatalog}
            className={`text-sm font-medium transition-colors ${
              scrolled ? 'text-[#0E0F26] hover:text-[#BF926B]' : 'text-[#F2F2F2] hover:text-[#F2F2F2] opacity-80'
            }`}
          >
            Catálogo
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
