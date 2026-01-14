import React from 'react';

interface LogoProps {
  className?: string;
  isWhite?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img src="/logo.png" alt="VHN Servicio Técnico" className="h-full w-auto" />
    </div>
  );
};

export default Logo;
