
import React from 'react';

interface LogoProps {
  className?: string;
  isWhite?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", isWhite = false }) => {
  return (
    <div className={`flex items-center gap-2 ${className} transition-all duration-300`}>
      {/* Icon Container */}
      <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shadow-lg transition-colors duration-300 ${isWhite ? 'bg-white' : 'bg-blue-600'}`}>
        <i className={`fas fa-tools text-xl transition-colors duration-300 ${isWhite ? 'text-blue-600' : 'text-white'}`}></i>
        <div className={`absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 transition-colors duration-300 ${isWhite ? 'border-white' : 'border-blue-600'}`}></div>
      </div>

      {/* Text Container */}
      <div className="flex flex-col leading-none">
        <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${isWhite ? 'text-white' : 'text-blue-900'}`}>
          VHN
        </span>
        <span className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-300 ${isWhite ? 'text-white/80' : 'text-slate-500'}`}>
          Servicio Técnico
        </span>
      </div>
    </div>
  );
};

export default Logo;
