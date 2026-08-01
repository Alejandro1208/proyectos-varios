import React from 'react';
import { Bus, Users, Shield, Zap, CheckCircle, ChevronRight, Wind, Wifi, ShieldCheck, MapPin } from 'lucide-react';
import companyData from '../data/companyData.json';

interface FleetSectionProps {
  onOpenQuoteModal: () => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onOpenQuoteModal }) => {
  const fleet = companyData.fleet;

  const fleetImages = [
    {
      url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
      title: "Vista Lateral - Mercedes Sprinter 516",
      tag: "Flota Propia Habilitada"
    },
    {
      url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop",
      title: "Interiores Ejecutivos Reclinables",
      tag: "Confort 19+1 Asientos"
    },
    {
      url: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=800&auto=format&fit=crop",
      title: "Logística y Monitoreo Satelital",
      tag: "Control GPS 24/7"
    }
  ];

  return (
    <section id="flota" className="py-20 bg-slate-950 text-white relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-4 py-1.5 rounded-full border border-indigo-800/60 inline-block mb-3">
            Equipamiento de Alta Gama
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Nuestra Flota: {fleet.quantity} Unidades {fleet.brand} {fleet.model}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {fleet.description}
          </p>
        </div>

        {/* Main Fleet Specs Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: Gallery Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
              <img
                src={fleetImages[0].url}
                alt={fleetImages[0].title}
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold px-3 py-1 rounded-md bg-blue-600 text-white shadow-md">
                    {fleetImages[0].tag}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {fleetImages[0].title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {fleetImages.slice(1).map((img, idx) => (
                <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-800 shadow-lg group">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-40 sm:h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900/90 text-blue-300 border border-slate-700">
                      {img.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical Features List */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900 p-8 border border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Especificaciones Técnicas</span>
                <h3 className="text-2xl font-bold text-white">{fleet.brand} {fleet.model}</h3>
              </div>
              <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Bus className="w-7 h-7" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="text-xs text-slate-400 font-medium">Unidades Disponibles</div>
                <div className="text-lg font-bold text-white mt-0.5">{fleet.quantity} Camionetas Idénticas</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="text-xs text-slate-400 font-medium">Capacidad Por Unidad</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">{fleet.capacity}</div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Prestaciones de Seguridad & Confort
              </h4>
              <ul className="space-y-2.5">
                {fleet.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenQuoteModal}
                className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Cotizar con Esta Flota</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
