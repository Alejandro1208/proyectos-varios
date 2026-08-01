import React from 'react';
import { Bus, Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import companyData from '../data/companyData.json';

export const Footer: React.FC = () => {
  const company = companyData.company;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      
      {/* Decorative subtle background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Company Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md border border-blue-400/30">
                <Bus className="w-6 h-6 text-blue-100" />
              </div>
              <div className="flex flex-col">
                {/* Light Contrasting Company Name */}
                <span className="text-xl font-black tracking-tight text-white font-sans">
                  {company.name}
                </span>
                <span className="text-xs text-blue-300 font-semibold tracking-wider uppercase">
                  {company.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md pt-2">
              {company.heroDescription}
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Flota Habilitada Mercedes-Benz Sprinter 516 (19+1 Pax)</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" onClick={(e) => scrollToSection(e, '#inicio')} className="hover:text-blue-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#nosotros" onClick={(e) => scrollToSection(e, '#nosotros')} className="hover:text-blue-400 transition-colors">
                  Nosotros & Qué hacemos
                </a>
              </li>
              <li>
                <a href="#servicios" onClick={(e) => scrollToSection(e, '#servicios')} className="hover:text-blue-400 transition-colors">
                  Servicios Corporativos & Grupales
                </a>
              </li>
              <li>
                <a href="#galeria" onClick={(e) => scrollToSection(e, '#galeria')} className="hover:text-blue-400 transition-colors">
                  Galería de Fotos
                </a>
              </li>
              <li>
                <a href="#trabaja-con-nosotros" onClick={(e) => scrollToSection(e, '#trabaja-con-nosotros')} className="hover:text-blue-400 transition-colors">
                  Trabaja con Nosotros (Choferes)
                </a>
              </li>
              <li>
                <a href="#contacto" onClick={(e) => scrollToSection(e, '#contacto')} className="hover:text-blue-400 transition-colors">
                  Contacto & Cotizaciones
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Datos de Contacto & Operaciones
            </h4>
            
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${company.formattedPhone}`} className="hover:text-white transition-colors font-semibold">
                  {company.phone}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${company.email}`} className="hover:text-white transition-colors break-all">
                  {company.email}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-emerald-300 font-semibold">{company.operatingHours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-semibold">{company.name}</span>. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300">Servicio de Traslado de Personas y Empresas</span>
            <a href="#top-navbar" onClick={(e) => scrollToSection(e, '#top-navbar')} className="text-blue-400 hover:underline">
              Volver arriba ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
