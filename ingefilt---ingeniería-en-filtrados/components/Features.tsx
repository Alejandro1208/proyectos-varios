import React from 'react';
import { ShieldCheck, Zap, Droplets, Filter } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Ranura Continua (Wedge Wire)",
    description: "Diseño en forma de V que evita obstrucciones y permite una limpieza fácil por retrolavado.",
    icon: Filter
  },
  {
    title: "Alta Durabilidad",
    description: "Fabricados en Acero Inoxidable (304, 304L, 316, 316L) resistente a la corrosión y altas presiones.",
    icon: ShieldCheck
  },
  {
    title: "Mayor Área Abierta",
    description: "Maximiza el flujo reduciendo la pérdida de carga y el consumo energético de las bombas.",
    icon: Zap
  },
  {
    title: "Precisión Micrométrica",
    description: "Aperturas de ranura personalizables desde 0.05mm para filtrados críticos.",
    icon: Droplets
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Por qué elegir nuestros filtros?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            La tecnología de ranura continua supera a las mallas tradicionales y tuberías ranuradas en eficiencia y vida útil.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};