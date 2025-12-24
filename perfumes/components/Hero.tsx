
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Props {
  onViewCatalog: () => void;
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
}

const Hero: React.FC<Props> = ({ onViewCatalog, hero }) => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center bg-[#0E0F26] overflow-hidden">
      {/* Background Image with heavy overlay */}
      <div className="absolute inset-0">
        <img 
          src={hero.image} 
          alt="Banner de perfumes" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0F26]/55 via-[#0D0D0D]/45 to-[#0E0F26]/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-[#F2F2F2] tracking-tighter mb-6">
          {hero.title}
        </h1>
        <p className="text-lg md:text-xl text-[#F2F2F2] opacity-80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          {hero.subtitle}
        </p>
        <button 
          onClick={onViewCatalog}
          className="bg-[#BF926B] text-[#0D0D0D] px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto shadow-lg shadow-black/20"
        >
          Ver Catálogo
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
