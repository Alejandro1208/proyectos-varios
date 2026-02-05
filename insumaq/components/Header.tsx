
import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';

interface HeaderProps {
  companyName: string;
  navItems: NavItem[];
  whatsappUrl: string;
}

const Header: React.FC<HeaderProps> = ({ companyName, navItems, whatsappUrl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setIsMenuOpen(false);
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo Replacement */}
        <a 
          href="#inicio" 
          onClick={(e) => handleNavClick(e, '#inicio')}
          className="flex items-center space-x-2"
        >
          {/* Aquí puedes reemplazar 'logo.png' con tu archivo real */}
          <img 
            src="/logo.png" 
            alt={companyName} 
            className="h-12 md:h-14 w-auto object-contain transition-all"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`font-bold uppercase text-sm tracking-wider hover:text-[#FDB813] transition-colors ${scrolled ? 'text-gray-800' : 'text-white'}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FDB813] hover:bg-[#e5a60d] text-[#002b52] px-6 py-2 rounded-md font-black flex items-center space-x-2 transition-all hover:scale-105 shadow-md"
          >
            <i className="fab fa-whatsapp"></i>
            <span>CONTACTAR</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} ${scrolled ? 'text-[#0055A4]' : 'text-white'}`}></i>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#002b52] z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8`}>
        <button className="absolute top-6 right-6 text-white text-3xl" onClick={() => setIsMenuOpen(false)}>
          <i className="fas fa-times"></i>
        </button>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="text-white text-3xl font-black italic hover:text-[#FDB813]"
          >
            {item.label}
          </a>
        ))}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FDB813] text-[#002b52] px-10 py-4 rounded-md font-black text-xl flex items-center space-x-2 shadow-xl"
        >
          <i className="fab fa-whatsapp"></i>
          <span>WhatsApp</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
