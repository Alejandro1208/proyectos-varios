
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, ChefHat, Layout, 
  Sofa, Briefcase, Instagram, Facebook, Music2,
  ExternalLink, Search
} from 'lucide-react';
import { CompanyData } from './types';
import localData from './data.json';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.624 1.435h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const App: React.FC = () => {
  const [data, setData] = useState<CompanyData | null>(localData as unknown as CompanyData);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');

  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = data?.logo || './images/logo-blanco.png';
    document.head.appendChild(link);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setIsMenuOpen(false);
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading || !data) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-brand-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-800"></div>
      </div>
    );
  }

  const categories = ['Todos', ...Array.from(new Set(data.portfolio.map(p => p.category)))];
  const filteredPortfolio = activeCategory === 'Todos' 
    ? data.portfolio 
    : data.portfolio.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen font-sans bg-brand-50 relative overflow-x-hidden">
      
      {/* REDES SOCIALES FLOTANTES */}
      <aside className={`fixed right-0 top-1/2 -translate-y-1/2 z-[80] flex flex-col items-end gap-2 pr-0 pointer-events-none transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
        <a 
          href={data.socials?.instagram || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pointer-events-auto bg-[#E4405F] text-white p-3 rounded-l-xl shadow-xl transition-all duration-300 hover:-translate-x-2 flex items-center group"
          aria-label="Instagram"
        >
          <Instagram size={24} />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold text-sm uppercase tracking-widest">Instagram</span>
        </a>
        <a 
          href={data.socials?.facebook || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pointer-events-auto bg-[#1877F2] text-white p-3 rounded-l-xl shadow-xl transition-all duration-300 hover:-translate-x-2 flex items-center group"
          aria-label="Facebook"
        >
          <Facebook size={24} />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold text-sm uppercase tracking-widest">Facebook</span>
        </a>
        <a 
          href={data.socials?.tiktok || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pointer-events-auto bg-black text-white p-3 rounded-l-xl shadow-xl transition-all duration-300 hover:-translate-x-2 flex items-center group"
          aria-label="TikTok"
        >
          <Music2 size={24} />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold text-sm uppercase tracking-widest">TikTok</span>
        </a>
      </aside>

      {/* HEADER CON ALTURA FIJA PARA EVITAR GAPS */}
      <header className={`fixed w-full z-[110] transition-all duration-500 flex items-center ${scrolled || isMenuOpen ? 'bg-white shadow-md h-16 md:h-20' : 'bg-transparent h-20 md:h-24'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center space-x-3 group">
            <div className="relative h-10 md:h-12">
              <img src={data.logo} alt="Logo" className="h-full w-auto opacity-0" />
              <div 
                className={`absolute inset-0 transition-colors duration-300 ${scrolled || isMenuOpen ? 'bg-brand-900' : 'bg-white'}`}
                style={{
                  maskImage: `url("${data.logo}")`,
                  WebkitMaskImage: `url("${data.logo}")`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center'
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg md:text-2xl font-serif font-bold tracking-tight leading-none transition-colors ${scrolled || isMenuOpen ? 'text-brand-900' : 'text-white'}`}>
                {data.name.toUpperCase()}
              </span>
              <span className={`text-[9px] md:text-xs tracking-[0.2em] font-medium leading-none mt-1 transition-colors ${scrolled || isMenuOpen ? 'text-brand-600' : 'text-brand-100'}`}>
                AMOBLAMIENTOS
              </span>
            </div>
          </a>

          {/* Nav Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {data.navigation.map(item => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`text-sm font-semibold hover:text-accent transition-colors ${scrolled ? 'text-stone-700' : 'text-white'}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a 
              href={data.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2 px-4"
            >
              <WhatsAppIcon />
              <span className="text-xs font-bold uppercase tracking-widest">Presupuesto</span>
            </a>
          </div>

          {/* Botones Móvil */}
          <div className="lg:hidden flex items-center space-x-4">
            <a href={data.whatsappUrl} className={scrolled || isMenuOpen ? 'text-green-600' : 'text-white'} aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={scrolled || isMenuOpen ? 'text-brand-900' : 'text-white'} aria-label="Menu">
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL - SIN ESPACIO (TOP-16 sincronizado con H-16) */}
        <div className={`fixed inset-0 top-16 md:top-20 bg-brand-900 z-[100] lg:hidden flex flex-col items-center justify-center transition-all duration-500 origin-top ${isMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'}`}>
          <nav className="flex flex-col space-y-8 text-center py-10 w-full px-6">
            {data.navigation.map((item, index) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => scrollToSection(e, item.id)}
                className="text-3xl font-serif text-white hover:text-accent font-bold transition-all"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-10 flex flex-col items-center gap-6">
               <a href={data.whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold flex items-center gap-3">
                  <WhatsAppIcon /> Escribinos ahora
               </a>
               <div className="flex gap-8">
                  <a href={data.socials?.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent"><Instagram size={28} /></a>
                  <a href={data.socials?.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent"><Facebook size={28} /></a>
                  <a href={data.socials?.tiktok} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent"><Music2 size={28} /></a>
               </div>
            </div>
          </nav>
        </div>
      </header>

      {/* SECCIONES */}
      <section id="home" className="relative h-[90vh] lg:h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 h-full w-full">
          <img src={data.banner.image} alt="Amoblamientos" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-3xl animate-fadeIn">
            <h4 className="text-accent font-bold tracking-[0.3em] uppercase mb-4 text-sm">Calidad Insuperable</h4>
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {data.banner.title}
            </h1>
            <p className="text-brand-100 text-lg md:text-xl mb-10 max-w-xl font-light">
              {data.banner.subtitle}
            </p>
            <a 
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="inline-flex items-center bg-brand-800 hover:bg-brand-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all"
            >
              {data.banner.buttonText}
              <ChevronRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <img src={data.about.image} alt="Empresa" className="rounded-lg shadow-2xl w-full h-[400px] md:h-[500px] object-cover" />
              <div className="absolute -bottom-6 -right-6 bg-brand-800 p-8 rounded-lg shadow-xl hidden md:block">
                <p className="text-accent text-3xl font-bold font-serif">+10 Años</p>
                <p className="text-white text-xs tracking-widest uppercase">Experiencia Real</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-8 leading-tight">
                {data.about.title}
              </h2>
              <p className="text-stone-600 text-lg mb-10 leading-relaxed italic">
                {data.about.text}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-l-4 border-brand-800 pl-4">
                  <h5 className="font-bold text-stone-900">Personalizado</h5>
                  <p className="text-stone-500 text-sm">Diseños que se adaptan a tu vida.</p>
                </div>
                <div className="border-l-4 border-brand-800 pl-4">
                  <h5 className="font-bold text-stone-900">Premium</h5>
                  <p className="text-stone-500 text-sm">Herrajes y terminaciones de lujo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-brand-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-16">Nuestras Soluciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.services.map((service, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all">
                <div className="text-brand-800 mb-6 flex justify-center">
                  {service.icon === 'ChefHat' && <ChefHat size={48} />}
                  {service.icon === 'Layout' && <Layout size={48} />}
                  {service.icon === 'Sofa' && <Sofa size={48} />}
                  {service.icon === 'Briefcase' && <Briefcase size={48} />}
                </div>
                <h3 className="text-xl font-bold mb-4 font-serif">{service.title}</h3>
                <p className="text-stone-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900">Proyectos Destacados</h2>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeCategory === cat ? 'bg-brand-800 text-white shadow-lg' : 'bg-brand-50 text-stone-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-square shadow-md">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <span className="text-accent text-xs font-bold uppercase mb-2">{item.category}</span>
                  <h3 className="text-white text-2xl font-serif font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-brand-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-8 italic">¿Tenés un proyecto en mente?</h2>
          <p className="text-brand-200 text-xl mb-12 max-w-2xl mx-auto">Te ayudamos a diseñar el mueble perfecto para tu espacio con presupuesto a medida.</p>
          <a 
            href={data.whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl transition-all"
          >
            <WhatsAppIcon />
            <span className="ml-3">Hablemos por WhatsApp</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 text-white py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-3 mb-4">
              <img src={data.logo} alt="Cristian Palavecino" className="h-10 md:h-12 w-auto object-contain" />
              <div className="flex flex-col text-left">
                <span className="text-lg md:text-2xl font-serif font-bold tracking-tight leading-none text-white">
                  {data.name.toUpperCase()}
                </span>
                <span className="text-[9px] md:text-xs tracking-[0.2em] font-medium leading-none mt-1 text-brand-100">
                  AMOBLAMIENTOS
                </span>
              </div>
            </div>
            <p className="text-stone-500 text-sm">Amoblamientos que definen tu estilo.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            {data.navigation.map(item => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => scrollToSection(e, item.id)}
                className="text-stone-400 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-4">
            <a href={data.socials?.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Instagram /></a>
            <a href={data.socials?.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Facebook /></a>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-[10px] text-stone-600 tracking-widest uppercase">© {new Date().getFullYear()} Cristian Palavecino Amoblamientos.</p>
        </div>
      </footer>

      {/* BOTÓN WHATSAPP FLOTANTE */}
      <a 
        href={data.whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-[120] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        <WhatsAppIcon />
      </a>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
