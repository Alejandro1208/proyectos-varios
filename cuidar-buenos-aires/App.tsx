
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  MessageCircle, 
  ChevronRight, 
  ShieldCheck, 
  Heart, 
  Waves,
  Accessibility,
  Utensils,
  Sparkles,
  Activity,
  Phone,
  CheckCircle2,
  Syringe,
  Bandage,
  Stethoscope,
  Pill,
  ClipboardList,
  GraduationCap,
  ShieldPlus,
  FileText,
  Briefcase,
  Brain,
  Wind,
  Lightbulb,
  Quote,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { content } from './content';

const IconMap: Record<string, React.ReactNode> = {
  Waves: <Waves size={24} />,
  Accessibility: <Accessibility size={24} />,
  Utensils: <Utensils size={24} />,
  Sparkles: <Sparkles size={24} />,
  Activity: <Activity size={24} />,
  Heart: <Heart size={24} />,
  Syringe: <Syringe size={24} />,
  Bandage: <Bandage size={24} />,
  Stethoscope: <Stethoscope size={24} />,
  Pill: <Pill size={24} />,
  ClipboardList: <ClipboardList size={24} />,
  GraduationCap: <GraduationCap size={24} />,
  ShieldPlus: <ShieldPlus size={24} />,
  Brain: <Brain size={24} />,
  Wind: <Wind size={24} />,
  Lightbulb: <Lightbulb size={24} />,
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Left */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo-solo.png" 
            alt={content.brand.name} 
            className={`h-10 w-auto ${scrolled ? 'scale-90' : 'scale-100'} transition-transform`}
          />
          <div className="flex flex-col">
            <span className={`text-lg md:text-xl font-bold tracking-tight ${scrolled ? 'text-blue-900' : 'text-blue-900 md:text-white'}`}>
              {content.brand.name}
            </span>
            <span className={`text-[10px] font-medium uppercase tracking-wider ${scrolled ? 'text-blue-500' : 'text-blue-100'}`}>
              {content.brand.tagline}
            </span>
          </div>
        </div>

        {/* Menu Right */}
        <nav className="hidden lg:flex items-center space-x-8">
          {content.navigation.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className={`text-sm font-semibold transition-colors hover:text-blue-500 ${scrolled ? 'text-slate-700' : 'text-white'}`}
            >
              {item.label}
            </a>
          ))}
          <a 
            href={content.brand.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full hover:bg-green-600 transition-all font-bold text-sm shadow-md"
          >
            <Phone size={16} />
            WHATSAPP
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <a 
            href={content.brand.whatsappLink}
            className="p-2 bg-green-500 text-white rounded-full shadow-md"
          >
            <Phone size={20} />
          </a>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`p-1 ${scrolled ? 'text-blue-900' : 'text-blue-900 md:text-white'}`}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b">
          <span className="font-bold text-blue-900">{content.brand.name}</span>
          <button onClick={() => setIsOpen(false)}><X size={32} /></button>
        </div>
        <div className="p-8 flex flex-col space-y-6">
          {content.navigation.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold text-slate-800"
            >
              {item.label}
            </a>
          ))}
          <a 
            href={content.brand.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-2 bg-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg"
          >
            <MessageCircle size={24} />
            HABLAR AHORA
          </a>
        </div>
      </div>
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative min-h-[90vh] md:min-h-[80vh] w-full flex items-center overflow-hidden py-24">
      <div className="absolute inset-0 z-0">
        <img 
          src="/banner.jpeg" 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/40 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-white flex flex-col items-center text-center">
          <img 
            src="/logo.png" 
            alt={content.brand.name} 
            className="h-48 md:h-80 w-auto mb-8 drop-shadow-2xl relative z-10"
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/30 backdrop-blur-md rounded-lg text-xs font-bold mb-6 border border-white/10 relative z-30">
            <ShieldCheck size={16} className="text-blue-300" />
            Cuidar Buenos Aires es una marca registrada especializada en cuidados.
          </div>
          <p className="text-lg md:text-xl mb-10 text-blue-50 leading-relaxed font-medium max-w-2xl">
            {content.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
            <a 
              href={content.brand.budgetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl"
            >
              <FileText size={20} />
              Pedinos presupuesto
            </a>
            <a 
              href={content.brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition-all shadow-xl"
            >
              {content.hero.cta}
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="empresa" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="/about.jpeg" 
              alt="Cuidado profesional" 
              className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-video lg:aspect-square"
            />
          </div>
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm mb-2 block">
              {content.about.subtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
              {content.about.title}
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
              {content.about.text}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {content.about.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                  <span className="text-sm font-bold text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'caregivers' | 'nurses' | 'kinesiology' | 'psychology'>('caregivers');
  const activeService = content.services[activeTab];

  return (
    <section id="servicios" className="py-20 md:py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {content.services.title}
          </h2>
          <p className="text-blue-600 font-semibold mb-4 uppercase tracking-wider text-sm">
            {content.services.subtitle}
          </p>
          <p className="text-slate-500 text-lg font-medium">{content.services.description}</p>
        </div>

        <div className="flex justify-center mb-12 px-4">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex flex-wrap justify-center gap-2">
            <button 
              onClick={() => setActiveTab('caregivers')}
              className={`px-4 md:px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'caregivers' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {content.services.caregivers.title}
            </button>
            <button 
              onClick={() => setActiveTab('nurses')}
              className={`px-4 md:px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'nurses' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {content.services.nurses.title}
            </button>
            <button 
              onClick={() => setActiveTab('kinesiology')}
              className={`px-4 md:px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'kinesiology' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {content.services.kinesiology.title}
            </button>
            <button 
              onClick={() => setActiveTab('psychology')}
              className={`px-4 md:px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'psychology' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {content.services.psychology.title}
            </button>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {'subtitle' in activeService && (
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100">
                {activeService.subtitle}
              </span>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeService.items.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  {IconMap[item.icon] || <Activity size={24} />}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-400 bg-white inline-block px-6 py-3 rounded-full border border-slate-100 shadow-sm">
              {activeService.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Protocols: React.FC = () => {
  return (
    <section id="protocolos" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-blue-50 rounded-[3rem] p-10 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-10 opacity-10 text-blue-900">
            <ShieldCheck size={200} />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-blue-950 mb-12 text-center md:text-left">
              {content.protocols.title}
            </h2>
            <div className="grid lg:grid-cols-3 gap-12">
              {content.protocols.items.map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="text-4xl font-black text-blue-200">0{i+1}</div>
                  <h3 className="text-xl font-bold text-blue-900">{item.title}</h3>
                  <p className="text-blue-800/70 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process: React.FC = () => {
  return (
    <section id="proceso" className="py-20 md:py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight text-slate-900">
          {content.process.title}
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {content.process.steps.map((step, i) => (
            <div key={i} className="flex-1 w-full bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center relative">
              {i < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-slate-200 z-0"></div>
              )}
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 mx-auto">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
              <p className="text-slate-500 font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900">
          {content.testimonials.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.testimonials.items.map((item, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-3xl relative">
              <Quote className="text-blue-200 absolute top-6 right-6" size={40} />
              <p className="text-slate-600 italic mb-6 relative z-10 font-medium">"{item.quote}"</p>
              <div className="flex items-center justify-between relative z-10">
                <p className="text-slate-900 font-bold">{item.author}</p>
                <img src="/logo-solo.png" alt="Cuidar BA" className="h-6 w-auto opacity-50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LegalNotice: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-4 flex items-center justify-between text-slate-500 hover:text-slate-700 transition-colors text-sm font-medium"
        >
          <span>{content.legal.title}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
          <div className="text-xs text-slate-400 space-y-2 max-w-4xl">
            {content.legal.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img 
                src="/logo-solo.png" 
                alt={content.brand.name} 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-white tracking-tight">CUIDAR<span className="text-blue-500">BA</span></span>
            </div>
            <p className="text-sm leading-relaxed">
              Cuidamos a quienes más quieres con el profesionalismo y la calidez que tu familia merece en Buenos Aires.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Navegación</h4>
            <ul className="space-y-4 text-sm">
              {content.navigation.map(n => (
                <li key={n.label}><a href={n.href} className="hover:text-blue-400 transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Seguridad</h4>
            <ul className="space-y-4 text-sm">
              <li>Empresa Registrada</li>
              <li>Seguro de Responsabilidad</li>
              <li>Contratos Formales</li>
              <li>Staff Capacitado</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contacto</h4>
            <a 
              href={content.brand.whatsappLink}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 transition-colors"
            >
              <MessageCircle size={18} />
              WHATSAPP
            </a>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Sumate al equipo</h4>
            <a 
              href={content.brand.workWithUsLink}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
            >
              <Briefcase size={16} />
              Trabaja con nosotros
            </a>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {content.brand.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppFloating: React.FC = () => {
  return (
    <a 
      href={content.brand.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all whatsapp-pulse group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        ¿Cómo podemos ayudarte?
      </span>
    </a>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = '/logo-solo.png';
      document.head.appendChild(newLink);
    } else {
      (link as HTMLLinkElement).href = '/logo-solo.png';
    }
  }, []);

  return (
    <div className="relative min-h-screen font-sans text-slate-900 bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Protocols />
        <Process />
        <Testimonials />
      </main>
      <LegalNotice />
      <Footer />
      <WhatsAppFloating />
    </div>
  );
};

export default App;
