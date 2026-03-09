import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Store, Box, ExternalLink, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import siteData from '../data.json';

export const Services = () => {
  const [selectedImage, setSelectedImage] = useState<{ url: string, title: string } | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const iconMap: Record<string, any> = { Truck, Store, Box };

  return (
    <section id="servicios" className="py-32 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-blue-600/10 border border-blue-500/20 text-blue-600 rounded-full text-xs font-black tracking-[0.3em] uppercase mb-6"
          >
            Portafolio de Proyectos
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl text-slate-900 mb-8 font-display font-black tracking-tight"
          >
            Nuestras Especialidades
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-3xl mx-auto text-xl font-medium leading-relaxed"
          >
            Diseñamos y fabricamos unidades a medida con los más altos estándares de calidad. 
            Cada proyecto es un desafío único que resolvemos con innovación y experiencia.
          </motion.p>
        </div>

        <div className="space-y-40">
          {siteData.services.map((service, index) => {
            const Icon = iconMap[service.id === 'food-trucks' ? 'Truck' : service.id === 'exhibidores' ? 'Store' : 'Box'];
            const isExpanded = expandedService === service.id;
            return (
              <div key={service.id} className="flex flex-col gap-16">
                <div className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Text Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2"
                  >
                    <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl shadow-blue-600/30 group-hover:rotate-6 transition-transform">
                      <Icon className="text-white w-10 h-10" />
                    </div>
                    <h3 className="text-4xl md:text-5xl text-slate-900 mb-8 font-display font-black tracking-tight leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xl leading-relaxed mb-8 font-medium">
                      {service.description}
                    </p>
                    <p className="text-slate-500 text-lg leading-relaxed mb-10">
                      {service.longDescription}
                    </p>
                    <motion.button 
                      onClick={() => setExpandedService(isExpanded ? null : service.id)}
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-sm group"
                    >
                      {isExpanded ? 'Ocultar especificaciones' : 'Ver especificaciones técnicas'}
                      <ChevronRight className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                    </motion.button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="pt-8 space-y-4">
                            {service.specs?.map((spec, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3 text-slate-600 font-medium"
                              >
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                {spec}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Featured Image */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2 relative group"
                  >
                    <div 
                      className="overflow-hidden rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] cursor-zoom-in"
                      onClick={() => setSelectedImage({ url: service.images[0], title: service.title })}
                    >
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8 }}
                        src={service.images[0]} 
                        alt={service.title} 
                        className="w-full aspect-[4/3] object-cover"
                      />
                      <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                          <ZoomIn className="text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Gallery Grid (6 images) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {service.images.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="group relative aspect-square overflow-hidden rounded-[2rem] cursor-zoom-in shadow-lg hover:shadow-2xl transition-all duration-500"
                      onClick={() => setSelectedImage({ url: img, title: `${service.title} - Proyecto ${i + 1}` })}
                    >
                      <img 
                        src={img} 
                        alt={`${service.title} ${i + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                        <ZoomIn className="text-white w-6 h-6" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-3 bg-white/5 rounded-full"
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="w-full h-auto rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
              />
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <h4 className="text-white font-display font-black text-2xl tracking-tight">{selectedImage.title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
