
import React, { useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhatsAppButton from './components/WhatsAppButton';
import { siteData as data } from './content';

const App: React.FC = () => {
  useEffect(() => {
    const link: HTMLLinkElement = (document.querySelector("link[rel*='icon']") as HTMLLinkElement) || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = '/logo.png';
    document.head.appendChild(link);
  }, []);

  const whatsappUrl = useMemo(() => {
    return `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(data.whatsappMessage)}`;
  }, [data.whatsappNumber, data.whatsappMessage]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        companyName={data.companyName} 
        navItems={data.navItems} 
        whatsappUrl={whatsappUrl}
      />
      
      <Hero 
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        ctaText={data.hero.ctaText}
        backgroundImage={data.hero.backgroundImage}
      />

      {/* About Section - Trust Building */}
      <section id="nosotros" className="py-24 bg-white overflow-hidden scroll-mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-[#0055A4]/10 rounded-sm transform rotate-2"></div>
              <div className="relative rounded-sm shadow-2xl w-full overflow-hidden bg-gray-200 border-b-8 border-[#FDB813]">
                <img 
                  src={data.about.image} 
                  alt="Equipo INSUMAQ en taller" 
                  className="w-full object-cover aspect-video lg:aspect-square"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#0055A4] text-white p-8 rounded-sm hidden md:block z-10 shadow-xl transform -skew-x-6">
                <p className="text-4xl font-black italic">15+</p>
                <p className="text-xs uppercase tracking-widest font-bold">Años liderando</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-[#0055A4] font-black uppercase tracking-[0.2em] text-sm flex items-center mb-4">
                <span className="w-8 h-[2px] bg-[#FDB813] mr-3"></span>
                {data.about.subtitle}
              </span>
              <h2 className="text-4xl md:text-6xl font-black mt-2 mb-8 text-gray-900 leading-none italic uppercase italic tracking-tighter">
                {data.about.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                {data.about.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Ingeniería Especializada",
                  "Repuestos Genuinos",
                  "Logística en Obra",
                  "Garantía Post-Venta"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 bg-gray-50 p-4 border-l-4 border-[#0055A4]">
                    <i className="fas fa-check text-[#FDB813] text-xl"></i>
                    <span className="font-bold uppercase text-sm tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 bg-[#002b52] text-white scroll-mt-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDB813]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Servicios Técnicos</h2>
              <p className="text-blue-200 text-lg">Mantenimiento de alta precisión para equipos viales, mineros y agrícolas.</p>
            </div>
            <a href={whatsappUrl} className="text-[#FDB813] font-black uppercase tracking-widest border-b-2 border-[#FDB813] pb-1 hover:text-white hover:border-white transition-all">
              Consultar falla técnica
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.services.map((service) => (
              <div key={service.id} className="bg-white/5 backdrop-blur-md p-10 rounded-sm border border-white/10 hover:border-[#FDB813]/50 transition-all duration-300 group relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                   <i className={`fas ${service.icon} text-4xl text-[#FDB813]`}></i>
                </div>
                <div className="w-16 h-1 bg-[#FDB813] mb-8 group-hover:w-full transition-all duration-500"></div>
                <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tight">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium italic">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spare Parts Section */}
      <section id="repuestos" className="py-24 bg-gray-50 overflow-hidden scroll-mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-4 border-2 border-[#0055A4] rounded-sm transform -rotate-1"></div>
              <div className="rounded-sm shadow-2xl overflow-hidden bg-gray-800">
                <img 
                  src={data.spareParts.image} 
                  alt="Stock de repuestos INSUMAQ" 
                  className="w-full object-cover aspect-video"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black mb-6 italic uppercase tracking-tighter text-[#002b52]">{data.spareParts.title}</h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
                {data.spareParts.description}
              </p>
              <div className="space-y-4 mb-10">
                {data.spareParts.categories.map((cat, idx) => (
                  <div key={idx} className="flex items-center space-x-4 bg-white p-4 shadow-sm rounded-sm group hover:bg-[#0055A4] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#FDB813] flex items-center justify-center text-[#002b52] font-black group-hover:bg-white">
                      {idx + 1}
                    </div>
                    <span className="font-bold uppercase text-sm tracking-wide group-hover:text-white transition-colors">{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-6">
          <div className="bg-[#FDB813] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between shadow-3xl gap-12 relative overflow-hidden transform -skew-y-1">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#002b52]"></div>
            <div className="text-[#002b52] text-center lg:text-left transform skew-y-1">
              <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase italic tracking-tighter">¿Máquina Detenida?</h2>
              <p className="text-[#002b52]/80 text-2xl font-bold italic">Nosotros la ponemos en marcha. Contacto directo con ingeniería.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 transform skew-y-1 w-full lg:w-auto">
              <a 
                href={whatsappUrl}
                className="bg-[#002b52] text-white font-black py-5 px-10 rounded-sm flex items-center justify-center space-x-4 hover:bg-black transition-all shadow-xl uppercase italic group"
              >
                <i className="fab fa-whatsapp text-2xl group-hover:scale-125 transition-transform"></i>
                <span>Enviar WhatsApp</span>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-24">
            <div className="group">
              <div className="text-[#0055A4] text-3xl mb-6 flex items-center space-x-4">
                <i className="fas fa-envelope p-4 bg-gray-100 rounded-sm group-hover:bg-[#FDB813] transition-colors"></i>
                <h4 className="font-black uppercase tracking-tighter text-xl text-gray-900 italic">Ventas</h4>
              </div>
              <p className="text-gray-500 font-medium pl-[72px]">
                <a href={`mailto:${data.contact.email}`} className="hover:text-[#FDB813] transition-colors">
                  {data.contact.email}
                </a>
              </p>
            </div>
            <div className="group">
              <div className="text-[#0055A4] text-3xl mb-6 flex items-center space-x-4">
                <i className="fas fa-phone p-4 bg-gray-100 rounded-sm group-hover:bg-[#FDB813] transition-colors"></i>
                <h4 className="font-black uppercase tracking-tighter text-xl text-gray-900 italic">Teléfonos</h4>
              </div>
              <div className="flex flex-col space-y-2 pl-[72px]">
                <a href="https://wa.me/5491176545170" target="_blank" rel="noopener noreferrer" className="text-gray-500 font-medium hover:text-[#FDB813] transition-colors">11 7654-5170</a>
                <a href="https://wa.me/542304108114" target="_blank" rel="noopener noreferrer" className="text-gray-500 font-medium hover:text-[#FDB813] transition-colors">2304 10 8114</a>
              </div>
            </div>
            <div className="group">
              <div className="text-[#0055A4] text-3xl mb-6 flex items-center space-x-4">
                <i className="fas fa-map-marker-alt p-4 bg-gray-100 rounded-sm group-hover:bg-[#FDB813] transition-colors"></i>
                <h4 className="font-black uppercase tracking-tighter text-xl text-gray-900 italic">Oficinas</h4>
              </div>
              <p className="text-gray-500 font-medium pl-[72px]">{data.contact.address}</p>
            </div>
            <div className="group">
              <div className="text-[#0055A4] text-3xl mb-6 flex items-center space-x-4">
                <i className="fas fa-clock p-4 bg-gray-100 rounded-sm group-hover:bg-[#FDB813] transition-colors"></i>
                <h4 className="font-black uppercase tracking-tighter text-xl text-gray-900 italic">Atención</h4>
              </div>
              <p className="text-gray-500 font-medium pl-[72px]">{data.contact.hours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002b52] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <img 
                src="/logo.png" 
                alt={data.companyName} 
                className="h-16 w-auto mb-4"
              />
              <div className="h-1 w-24 bg-[#FDB813]"></div>
            </div>
            <nav className="flex flex-wrap justify-center gap-8">
              {data.navItems.map(item => (
                <a key={item.label} href={item.href} className="font-bold uppercase text-xs tracking-[0.2em] hover:text-[#FDB813] transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex space-x-6 text-2xl">
              <a href="#" className="hover:text-[#FDB813] transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-[#FDB813] transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-[#FDB813] transition-colors"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-blue-300">
            <p className="mb-2">© {new Date().getFullYear()} INSUMAQ - Ingeniería en Maquinaria y Repuestos. Todos los derechos reservados.</p>
            <p className="text-xs opacity-60 font-medium uppercase tracking-wider">De RAQUEL CRISTO | CUIT 27-42648619-4</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton url={whatsappUrl} />
    </div>
  );
};

export default App;
