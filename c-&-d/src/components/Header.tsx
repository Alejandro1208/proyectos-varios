import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../lib/utils';
import siteData from '../data.json';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-lg py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio">
          <Logo isLight={!scrolled} />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10">
          {siteData.navigation.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-colors relative group py-2",
                scrolled ? "text-slate-700 hover:text-blue-600" : "text-white/90 hover:text-white"
              )}
              whileHover={{ y: -2 }}
            >
              {link.name}
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
              <span className={cn(
                "absolute bottom-0 left-0 w-0 h-0.5 rounded-full group-hover:w-full transition-all duration-300",
                scrolled ? "bg-blue-600" : "bg-white"
              )} />
            </motion.a>
          ))}
          <motion.a
            href={`https://wa.me/${siteData.company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-green-500/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </motion.a>
        </nav>

        {/* Mobile Toggle */}
        <motion.button 
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className={cn(
            "md:hidden p-3 rounded-2xl shadow-sm transition-all duration-300",
            scrolled 
              ? "text-slate-900 bg-slate-100" 
              : "text-white bg-white/10 backdrop-blur-md border border-white/20"
          )}
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X /> : <Menu />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl shadow-2xl p-8 md:hidden flex flex-col gap-6 rounded-b-[2.5rem] border-t border-slate-100 overflow-hidden"
          >
            {siteData.navigation.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-display font-bold text-slate-800 hover:text-blue-600 transition-colors flex items-center justify-between group"
              >
                {link.name}
                <motion.div 
                  className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <X className="rotate-45 w-4 h-4" />
                </motion.div>
              </motion.a>
            ))}
            <motion.a
              href={`https://wa.me/${siteData.company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-3 bg-green-500 text-white py-5 rounded-3xl font-bold text-lg shadow-xl shadow-green-500/20 mt-4"
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={24} />
              <span>Contactar por WhatsApp</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
