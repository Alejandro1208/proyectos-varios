
import React from 'react';
import { CONFIG } from '../constants';

interface Props {
  onAdminClick: () => void;
  phone: string;
}

const Footer: React.FC<Props> = ({ onAdminClick, phone }) => {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#8C8C8C]/30 pt-20 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-2xl font-bold tracking-tighter text-[#F2F2F2]">
            GROWSE<span className="text-[#BF926B]">STORE</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-[#F2F2F2] opacity-80">
            <span className="cursor-default">{phone}</span>
            <span className="cursor-default">{CONFIG.email}</span>
            <span className="cursor-default">{CONFIG.address}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#8C8C8C]/30 gap-4">
          <p className="text-sm text-[#8C8C8C]">© {new Date().getFullYear()} {CONFIG.name}.</p>
          
          <button 
            onClick={onAdminClick}
            className="text-[10px] uppercase tracking-[0.3em] text-[#BF926B] hover:text-[#F2F2F2] transition-colors font-bold"
          >
            Acceso Admin
          </button>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
