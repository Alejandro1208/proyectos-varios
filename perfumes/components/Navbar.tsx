
import React, { useState, useEffect } from 'react';
import { CONFIG } from '../constants';

interface Props {
  onViewCatalog: () => void;
}

const Navbar: React.FC<Props> = ({ onViewCatalog }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
