import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Instagram, Facebook, Send, Phone, Mail, Camera, CheckCircle2, ChevronRight, ChevronLeft, Menu, X } from 'lucide-react';
import data from './data.json';
import { cn } from './utils';
import { useStore } from './store';

// --- Components ---

const Navbar = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-12",
      scrolled ? "py-2 bg-white/80 backdrop-blur-md shadow-sm" : "py-6 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <img src={data.company.logo} alt="Logo" className="w-10 h-10 rounded-full shadow-md" />
          <span className={cn(
            "font-display font-bold text-xl tracking-tighter transition-colors duration-500",
            scrolled ? "text-slate-900" : "text-white drop-shadow-lg"
          )}>
            {data.company.name}
          </span>
        </motion.div>

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          <div className="glass px-8 py-3 rounded-full flex gap-8">
            {data.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative group text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pastel-pink transition-all duration-300 group-hover:w-full" />
                {/* Futuristic 2027 Hover Effect */}
                <span className="absolute -inset-x-2 -inset-y-1 bg-pastel-pink/0 rounded-lg scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:bg-pastel-pink/20 transition-all duration-500 -z-10" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 glass rounded-full text-slate-700"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 glass rounded-custom p-8 md:hidden flex flex-col gap-6 items-center"
          >
            {data.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="text-lg font-medium text-slate-700 hover:text-pastel-pink transition-colors"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.3, 0.7]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={data.hero.backgroundImage} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black backdrop-blur-[2px]" 
        />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl"
        >
          {data.hero.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/90 mb-10 font-light"
        >
          {data.hero.subtitle}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="#presupuesto"
            className="px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:bg-pastel-pink transition-all hover:scale-105 shadow-xl"
          >
            {data.hero.ctaBudget}
          </a>
          <a 
            href="#trabajos"
            className="px-8 py-4 glass text-white rounded-full font-semibold hover:bg-white/20 transition-all hover:scale-105"
          >
            {data.hero.ctaProjects}
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="empresa" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pastel-pink rounded-full blur-3xl opacity-50" />
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
            alt="Nuestra Cocina" 
            className="rounded-custom shadow-2xl relative z-10"
          />
          <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl z-20 hidden md:block">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">Experiencia</p>
            <p className="text-3xl font-bold text-slate-900">+10 Años</p>
          </div>
        </motion.div>

        <div>
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-slate-900"
          >
            La Empresa
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed mb-12"
          >
            {data.company.description}
          </motion.p>
          
          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-pastel-blue/30 rounded-3xl"
            >
              <p className="text-4xl font-bold text-slate-900 mb-2">
                <Counter value={data.company.stats.clients} />
              </p>
              <p className="text-slate-500 font-medium">Clientes Felices</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-pastel-purple/30 rounded-3xl"
            >
              <p className="text-4xl font-bold text-slate-900 mb-2">
                <Counter value={data.company.stats.events} />
              </p>
              <p className="text-slate-500 font-medium">Eventos Realizados</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasStarted) {
        setHasStarted(true);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [hasStarted, value]);

  return <span ref={ref}>{count}</span>;
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="trabajos" className="py-24 overflow-hidden bg-soft-bg">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Trabajos Realizados
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            Explora nuestra galería de creaciones únicas.
          </motion.p>
        </div>
      </div>

      <div className="relative group">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 px-6 no-scrollbar mask-fade-edges cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {data.gallery.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedImage(img)}
              className="min-w-[300px] h-[400px] rounded-custom overflow-hidden shadow-xl cursor-pointer flex-shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <img src={img} alt={`Trabajo ${idx}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selectedImage}
              className="max-w-full max-h-full rounded-3xl shadow-2xl"
            />
            <button className="absolute top-10 right-10 text-white glass p-3 rounded-full">
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const CustomSelect = ({ 
  label, 
  value, 
  options, 
  onChange, 
  placeholder = "Selecciona una opción" 
}: { 
  label: string, 
  value: string, 
  options: { id: string, label: string }[] | string[], 
  onChange: (val: string) => void,
  placeholder?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = typeof options[0] === 'string' 
    ? (value || placeholder)
    : (options as { id: string, label: string }[]).find(o => o.id === value)?.label || placeholder;

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-6 py-4 bg-soft-bg rounded-2xl border-2 border-transparent text-left flex items-center justify-between transition-all hover:bg-slate-100",
          isOpen && "border-pastel-pink bg-white ring-4 ring-pastel-pink/20"
        )}
      >
        <span className={cn(!value && "text-slate-400")}>{selectedLabel}</span>
        <ChevronRight size={20} className={cn("text-slate-400 transition-transform duration-300", isOpen ? "-rotate-90" : "rotate-90")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 w-full bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden py-2"
          >
            {options.map((opt) => {
              const id = typeof opt === 'string' ? opt : opt.id;
              const label = typeof opt === 'string' ? opt : opt.label;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onChange(id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full px-6 py-3 text-left text-sm transition-colors hover:bg-pastel-pink/30",
                    value === id ? "bg-pastel-pink/50 font-semibold text-slate-900" : "text-slate-600"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BudgetForm = () => {
  const [formState, setFormState] = useState({
    people: '',
    filling: '',
    type: 'clasica',
    name: '',
    phone: '',
    image: null as string | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({
        people: '',
        filling: '',
        type: 'clasica',
        name: '',
        phone: '',
        image: null
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="presupuesto" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Presupuesto
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            Cuéntanos sobre tu evento y diseñemos la torta perfecta.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-custom shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Cantidad de personas</label>
                <input 
                  type="number" 
                  required
                  value={formState.people}
                  onChange={e => setFormState({...formState, people: e.target.value})}
                  placeholder="Ej: 50"
                  className="w-full px-6 py-4 bg-soft-bg rounded-2xl focus:ring-2 focus:ring-pastel-pink outline-none transition-all"
                />
              </div>
              <CustomSelect 
                label="Relleno"
                value={formState.filling}
                options={data.budget.fillings}
                onChange={val => setFormState({...formState, filling: val})}
                placeholder="Selecciona un relleno"
              />
              <CustomSelect 
                label="Tipo de torta"
                value={formState.type}
                options={data.budget.types}
                onChange={val => setFormState({...formState, type: val})}
              />
            </div>

            <div className="space-y-6">
              {formState.type === 'personalizada' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Sube tu diseño</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full py-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-pastel-pink transition-colors">
                      <Camera className="text-slate-400 group-hover:text-pastel-pink" />
                      <span className="text-sm text-slate-500">Haz clic para subir imagen</span>
                    </div>
                  </div>
                  {formState.image && (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md">
                      <img src={formState.image} className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setFormState({...formState, image: null})}
                        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                  placeholder="Tu nombre completo"
                  className="w-full px-6 py-4 bg-soft-bg rounded-2xl focus:ring-2 focus:ring-pastel-pink outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono</label>
                <input 
                  type="tel" 
                  required
                  value={formState.phone}
                  onChange={e => setFormState({...formState, phone: e.target.value})}
                  placeholder="Ej: +54 9 11 ..."
                  className="w-full px-6 py-4 bg-soft-bg rounded-2xl focus:ring-2 focus:ring-pastel-pink outline-none transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-2 mt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Pedir Presupuesto
                    <Send size={20} />
                  </>
                )}
              </button>
            </div>
          </form>

          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 p-6 bg-pastel-green/50 rounded-2xl flex items-center gap-4 text-slate-800"
              >
                <CheckCircle2 className="text-green-600" />
                <p className="font-medium">¡Presupuesto enviado con éxito! Nos contactaremos pronto.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Breakfasts = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-pastel-yellow/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              {data.breakfasts.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed mb-8"
            >
              {data.breakfasts.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a 
                href={data.contact.whatsapp}
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 bg-pastel-pink text-slate-900 rounded-full font-semibold hover:bg-pastel-pink/80 transition-all shadow-lg"
              >
                Consultar por WhatsApp
                <Phone size={20} />
              </a>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {data.breakfasts.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "rounded-3xl overflow-hidden shadow-lg aspect-square",
                  idx % 2 !== 0 ? "mt-8" : ""
                )}
              >
                <img src={img} alt={`Desayuno ${idx}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <footer id="contacto" className="py-24 px-6 md:px-12 bg-slate-900 text-white rounded-t-[4rem]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={data.company.logo} alt="Logo" className="w-12 h-12 rounded-full" />
              <span className="font-display font-bold text-2xl tracking-tighter">{data.company.name}</span>
            </div>
            <p className="text-slate-400 font-light">
              Haciendo tus eventos más dulces desde hace más de una década.
            </p>
            <div className="flex gap-4">
              {data.contact.social.map(s => (
                <a 
                  key={s.name} 
                  href={s.url} 
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all"
                >
                  {s.name === 'Instagram' && <Instagram size={20} />}
                  {s.name === 'Facebook' && <Facebook size={20} />}
                  {s.name === 'Pinterest' && <Camera size={20} />}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-8">Contacto Directo</h3>
            <a 
              href={data.contact.whatsapp}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-pastel-pink group-hover:text-slate-900 transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400">WhatsApp</p>
                <p className="font-medium">Escríbenos ahora</p>
              </div>
            </a>
            <a 
              href={`mailto:${data.contact.email}`}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-pastel-pink group-hover:text-slate-900 transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400">{data.contact.emailLabel}</p>
                <p className="font-medium">{data.contact.email}</p>
              </div>
            </a>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-8">Navegación</h3>
            <div className="grid grid-cols-2 gap-4">
              {data.navigation.map(item => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {data.company.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Breakfasts />
        <BudgetForm />
        <Contact />
      </main>
      
      {/* Floating WhatsApp Button */}
      <motion.a
        href={data.contact.whatsapp}
        target="_blank"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center"
      >
        <Phone size={32} />
      </motion.a>
    </div>
  );
}
