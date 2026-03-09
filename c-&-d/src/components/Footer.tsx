import React from 'react';
import { Truck, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import siteData from '../data.json';
import { Logo } from './Logo';
import { motion } from 'motion/react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-24 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Logo className="scale-90 origin-left" />
            <p className="text-sm leading-relaxed font-medium text-slate-500 max-w-xs">
              {siteData.company.description.split('.')[0]}. Calidad y diseño que superan expectativas en cada fabricación especial.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                <motion.a 
                  key={social}
                  href="#" 
                  aria-label={`Visita nuestro perfil de ${social}`}
                  whileHover={{ y: -5, backgroundColor: "rgba(37,99,235,1)", color: "white" }}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center transition-all duration-300"
                >
                  {social === 'Instagram' && <Instagram size={18} />}
                  {social === 'Facebook' && <Facebook size={18} />}
                  {social === 'Twitter' && <Twitter size={18} />}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Servicios</h4>
            <ul className="space-y-4 text-sm font-bold">
              {siteData.services.map(s => (
                <li key={s.id}>
                  <a href="#servicios" className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#servicios" className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Proyectos a Medida
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Empresa</h4>
            <ul className="space-y-4 text-sm font-bold">
              {siteData.navigation.map(n => (
                <li key={n.name}>
                  <a href={n.href} className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {n.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Contacto Directo</h4>
            <ul className="space-y-6 text-sm font-bold">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <Phone size={16} className="text-blue-500" />
                </div>
                <span className="group-hover:text-white transition-colors">{siteData.company.phone}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <Mail size={16} className="text-blue-500" />
                </div>
                <span className="group-hover:text-white transition-colors">{siteData.company.email}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <MapPin size={16} className="text-blue-500" />
                </div>
                <span className="group-hover:text-white transition-colors">{siteData.company.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
          <p className="text-slate-600">© {new Date().getFullYear()} {siteData.company.name}. Todos los derechos reservados.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
