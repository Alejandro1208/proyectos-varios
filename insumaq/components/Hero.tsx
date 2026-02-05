
import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, backgroundImage }) => {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('servicios');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      window.history.pushState(null, '', '#servicios');
    }
  };

  return (
    <section 
      id="inicio"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-slow-zoom"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#002b52]/90 via-[#002b52]/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-white flex flex-col items-start max-w-5xl">
        <div className="bg-[#FDB813] text-[#002b52] px-4 py-1 font-black text-sm uppercase tracking-widest mb-4 inline-block transform -skew-x-12">
          Potencia Industrial
        </div>
        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[0.9] italic uppercase tracking-tighter animate-fade-in-up">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-200 font-medium max-w-2xl leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#servicios"
            onClick={handleCtaClick}
            className="bg-[#FDB813] hover:bg-[#e5a60d] text-[#002b52] font-black py-5 px-12 rounded-sm text-lg uppercase transition-all transform hover:-translate-y-1 shadow-2xl inline-flex items-center space-x-3 italic"
          >
            <span>{ctaText}</span>
            <i className="fas fa-arrow-right"></i>
          </a>
          <a
            href="#contacto"
            className="border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm text-white font-black py-5 px-12 rounded-sm text-lg uppercase transition-all"
          >
            Cotizar Repuestos
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
