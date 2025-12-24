import React from 'react';

export const Logo: React.FC<{ className?: string; dark?: boolean }> = ({ className = "w-10 h-10", dark = false }) => {
  const strokeColor = dark ? "#1e293b" : "#ffffff"; // Slate-800 or White

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        {/* Outer Cylinder Shape representing the filter tube */}
        <path d="M50 10 C25 10 10 18 10 25 V75 C10 82 25 90 50 90 C75 90 90 82 90 75 V25 C90 18 75 10 50 10 Z" stroke={strokeColor} strokeWidth="6" />
        
        {/* Top Ellipse */}
        <ellipse cx="50" cy="25" rx="40" ry="15" stroke={strokeColor} strokeWidth="4" />
        
        {/* Vertical Wedge Wires (The "Slots") */}
        <line x1="30" y1="38" x2="30" y2="84" stroke={strokeColor} strokeWidth="3" strokeDasharray="5 5" />
        <line x1="50" y1="40" x2="50" y2="90" stroke={strokeColor} strokeWidth="3" strokeDasharray="5 5" />
        <line x1="70" y1="38" x2="70" y2="84" stroke={strokeColor} strokeWidth="3" strokeDasharray="5 5" />
        
        {/* Horizontal bands implies structure */}
        <path d="M10 50 Q50 65 90 50" stroke={strokeColor} strokeWidth="2" strokeOpacity="0.5" fill="none"/>
      </svg>
      <div className="flex flex-col justify-center">
        <span className={`font-bold text-xl leading-none tracking-tight ${dark ? 'text-slate-800' : 'text-white'}`}>Ingefilt</span>
        <span className={`text-[0.65rem] uppercase tracking-widest ${dark ? 'text-blue-600' : 'text-blue-300'}`}>Ingeniería en Filtrados</span>
      </div>
    </div>
  );
};