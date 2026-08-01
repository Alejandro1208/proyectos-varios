import React, { useState, useEffect } from 'react';
import { Menu, X, Bus, PhoneCall, ArrowUpRight } from 'lucide-react';
import companyData from '../data/companyData.json';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Trabaja con Nosotros', href: '#trabaja-con-nosotros' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = `https://wa.me/${companyData.company.whatsappNumber}?text=${encodeURIComponent(companyData.company.whatsappDefaultMessage)}`;

  return (
    <header 
      id="top-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-slate-800/80 py-3' 
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Company Name - Left */}
          <a 
            href="#inicio" 
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-3 group focus:outline-none"
            id="brand-logo-link"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border border-blue-400/30">
              <Bus className="w-6 h-6 text-blue-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors font-sans">
                {companyData.company.shortName}
              </span>
              <span className="text-[10px] sm:text-xs text-blue-200/80 font-medium tracking-wider uppercase">
                Traslados
              </span>
            </div>
          </a>

          {/* Desktop Nav Items - Right */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" id="desktop-nav-menu">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-700/50"
              >
                {link.name}
              </a>
            ))}

            {/* WhatsApp Header CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-btn"
              className="ml-3 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md hover:shadow-emerald-900/30 transition-all duration-200 transform hover:-translate-y-0.5 border border-emerald-400/30"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>
          </nav>

          {/* Mobile Hamburger Button - Right */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-hamburger-btn"
              type="button"
              className="p-2.5 rounded-xl text-slate-200 hover:text-white bg-slate-800/80 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <X className="w-6 h-6 text-blue-400" />
              ) : (
                <Menu className="w-6 h-6 text-slate-200" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div 
          className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl transition-all"
          id="mobile-menu"
        >
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-100 hover:text-white hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700/50"
              >
                {link.name}
              </a>
            ))}

            {/* WhatsApp CTA in Mobile Menu */}
            <div className="pt-4 mt-2 border-t border-slate-800">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-menu-whatsapp-btn"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base shadow-lg transition-all"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Contactar por WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
