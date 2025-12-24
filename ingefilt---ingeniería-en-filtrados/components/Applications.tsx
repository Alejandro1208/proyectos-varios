import React, { useState } from 'react';
import { Application } from '../types';
import { X, TrendingUp, CheckCircle2 } from 'lucide-react';
import Pozos from '../assets/pozos-agua.jpeg';
import Mineria from '../assets/mineria.jpeg';
import Alimentos from '../assets/alimentos.jpeg';
import Petroleo from '../assets/petroleo.jpeg';


// Updated images with more reliable Unsplash IDs relevant to the industry
const applications: Application[] = [
  {
    title: "Pozos de Agua",
    description: "Prevención de entrada de arena en acuíferos profundos y municipales.",
    image: Pozos
  },
  {
    title: "Minería y Procesos",
    description: "Tamizado de carbón, potasa, taconita y recuperación de minerales.",
    image: Mineria
  },
  {
    title: "Alimentos y Bebidas",
    description: "Filtrado sanitario para azúcar, almidón, pulpa y cervecerías.",
    image: Alimentos
  },
  {
    title: "Petróleo y Gas",
    description: "Control de arena en pozos petroleros y refinación.",
    image: Petroleo
  },
  {
    title: "Industria Cosmética",
    description: "Filtración de alta pureza para cremas, lociones y bases líquidas.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"
  }
];

const successStories = [
  {
    title: "Recuperación de Agua en Minería",
    client: "Minera del Norte",
    metric: "+40% Eficiencia",
    description: "Reemplazo de mallas sintéticas por filtros Wedge Wire de 0.5mm, reduciendo paradas por mantenimiento en un 80%."
  },
  {
    title: "Pozo Municipal de Alta Capacidad",
    client: "Aguas Provinciales",
    metric: "0 PPM Arena",
    description: "Instalación de 120m de filtro ranura continua en pozo profundo, garantizando agua libre de sedimentos por +20 años."
  },
  {
    title: "Optimización de Macerado",
    client: "Cervecería Artesanal",
    metric: "Filtrado 2x Rápido",
    description: "Fondo falso tipo Johnson para tanque de maceración, mejorando la claridad del mosto y velocidad de flujo."
  }
];

export const Applications: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="applications" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Aplicaciones Industriales</h2>
            <p className="text-slate-400">
              Nuestra tecnología se adapta a los entornos más exigentes, proporcionando confiabilidad donde más importa.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
             <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-2 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
             >
                <TrendingUp size={16} className="text-blue-400" />
                Ver casos de éxito
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {applications.map((app, index) => (
            <div 
              key={index} 
              onClick={scrollToContact}
              className="group relative h-80 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <img 
                src={app.image} 
                alt={app.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-xl font-bold mb-2 text-white">{app.title}</h3>
                <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {app.description}
                </p>
                <span className="text-xs text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 inline-block font-semibold">Consultar aplicación →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-bold text-slate-900">Casos de Éxito Recientes</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {successStories.map((story, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg text-slate-800">{story.title}</h4>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      {story.metric}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 font-medium mb-3">{story.client}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {story.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={(e) => {
                  setIsModalOpen(false);
                  scrollToContact(e as any);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors w-full sm:w-auto"
              >
                Quiero lograr resultados similares
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};