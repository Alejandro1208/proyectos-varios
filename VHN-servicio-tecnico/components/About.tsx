
import React from 'react';

interface AboutProps {
  description: string;
}

const About: React.FC<AboutProps> = ({ description }) => {
  const stats = [
    { label: 'Años de Experiencia', value: '10+' },
    { label: 'Técnicos Certificados', value: '5' },
    { label: 'Marcas Atendidas', value: '20+' },
    { label: 'Clientes Satisfechos', value: '500+' },
  ];

  return (
    <section id="nosotros" className="py-24 bg-gray-50 scroll-mt-24 overflow-x-hidden md:overflow-x-visible">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2 relative pr-0 md:pr-12">
            {/* Background Decorations */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100 rounded-3xl -z-10"></div>
            <div className="absolute -bottom-6 -right-2 w-32 h-32 bg-orange-100 rounded-3xl -z-10"></div>
            
            {/* Main Image Container */}
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000"
                alt="Mantenimiento Técnico VHN"
                className="rounded-[2.5rem] shadow-2xl w-full object-cover h-[400px] md:h-[500px]"
              />
              
              {/* Badge 24/7 - High Z-index to stay on top */}
              <div className="absolute -bottom-6 -right-4 md:-right-10 bg-blue-600 p-6 md:p-8 rounded-[2rem] text-white shadow-2xl z-30 hidden sm:block animate-bounce-slow border-4 border-white">
                <p className="text-3xl md:text-4xl font-black">24/7</p>
                <p className="font-bold opacity-90 uppercase tracking-widest text-[10px] md:text-xs">Soporte Técnico</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Sobre Nosotros</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              Comprometidos con la <span className="text-blue-600">continuidad</span> de su cocina industrial.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10 text-justify">
              {description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                  <p className="text-3xl font-black text-blue-600 mb-1 group-hover:scale-110 transition-transform origin-left">{stat.value}</p>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
