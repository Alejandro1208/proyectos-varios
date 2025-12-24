import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ImageProducto from '../assets/product.jpg'; 

const specs = [
  { label: "Material", value: "Acero Inox AISI 304, 304L, 316, 316L" },
  { label: "Tamaño de Ranura", value: "0.10mm - 6.00mm (Personalizable)" },
  { label: "Diámetros", value: "Desde 1\" hasta 40\"" },
  { label: "Tipos de Conexión", value: "Soldada, Roscada (NPT/BSP), Brida" },
  { label: "Longitud", value: "Hasta 6 metros por tramo" },
  { label: "Dirección de Flujo", value: "De afuera hacia adentro (FOTI) o inversa" },
];

export const ProductSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs'>('overview');

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="product" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Product Image Section */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-200 aspect-square lg:aspect-[4/5] group">
              <img 
                src={ImageProducto} 
                alt="Filtro Ranura Continua Acero Inoxidable Detalle"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-mono text-sm text-blue-300">SERIE INDUSTRIAL</p>
                <h3 className="text-2xl font-bold">Wedge Wire Screen</h3>
              </div>
            </div>
            
            {/* Decoration Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-100 rounded-full blur-3xl -z-10"></div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <div className="mb-2 text-blue-600 font-semibold tracking-wide uppercase text-sm">Producto Estrella</div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Filtro de Ranura Continua</h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              El tubo de filtro tipo Johnson (Wedge Wire) es la solución definitiva para el control de arena y sólidos. 
              Su estructura de alambre triangular soldado en cada intersección garantiza una robustez inigualable y un rendimiento hidráulico superior.
            </p>

            {/* Tabs */}
            <div className="flex space-x-6 border-b border-slate-200 mb-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'overview' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Resumen
              </button>
              <button 
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'specs' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Ficha Técnica
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === 'overview' ? (
                <ul className="space-y-4">
                  {[
                    "Estructura anti-colapso para pozos profundos.",
                    "Ranura 'No-Clog' (Auto-limpiante).",
                    "Reducción significativa de velocidad de entrada.",
                    "Vida útil 3x superior a filtros convencionales."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                  <li className="mt-8">
                     <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-800 italic">
                          "Diseñamos cada filtro según la granulometría de su proyecto para garantizar cero paso de arena."
                        </p>
                     </div>
                  </li>
                </ul>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {specs.map((spec, i) => (
                    <div key={i} className="border-b border-slate-100 pb-2">
                      <dt className="text-xs uppercase text-slate-400 font-semibold tracking-wider mb-1">{spec.label}</dt>
                      <dd className="text-slate-800 font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Solicitar catálogo completo
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};