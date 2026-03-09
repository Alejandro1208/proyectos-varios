import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import siteData from '../data.json';

export const Contact = () => {
  return (
    <section id="contacto" className="py-32 px-6 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-24">
          {/* Info Side */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="text-blue-500 font-black tracking-[0.3em] uppercase text-xs mb-6 block"
              >
                Contacto
              </motion.span>
              <h2 className="text-5xl md:text-6xl mb-10 font-display font-black tracking-tight leading-tight">
                ¿Tienes un proyecto en mente?
              </h2>
              <p className="text-slate-400 text-xl mb-16 max-w-md font-medium leading-relaxed">
                Estamos listos para ayudarte a llevar tu negocio al siguiente nivel. 
                Contáctanos y solicita tu presupuesto sin compromiso.
              </p>

              <div className="space-y-10">
                <motion.div 
                  className="flex items-start gap-8 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-16 h-16 bg-blue-600/10 border border-blue-600/20 rounded-[1.5rem] flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 shadow-lg shadow-blue-600/0 group-hover:shadow-blue-600/20">
                    <Phone className="text-blue-500 group-hover:text-white transition-colors w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Llámanos</p>
                    <p className="text-2xl font-display font-bold group-hover:text-blue-400 transition-colors">{siteData.company.phone}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-8 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-16 h-16 bg-blue-600/10 border border-blue-600/20 rounded-[1.5rem] flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 shadow-lg shadow-blue-600/0 group-hover:shadow-blue-600/20">
                    <Mail className="text-blue-500 group-hover:text-white transition-colors w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Email</p>
                    <p className="text-2xl font-display font-bold group-hover:text-blue-400 transition-colors">{siteData.company.email}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-8 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-16 h-16 bg-blue-600/10 border border-blue-600/20 rounded-[1.5rem] flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 shadow-lg shadow-blue-600/0 group-hover:shadow-blue-600/20">
                    <MapPin className="text-blue-500 group-hover:text-white transition-colors w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Ubicación</p>
                    <p className="text-2xl font-display font-bold group-hover:text-blue-400 transition-colors">{siteData.company.location}</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-20 flex gap-6">
                <motion.a 
                  href={`https://wa.me/${siteData.company.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-green-500 hover:border-green-400 transition-all duration-300 shadow-xl"
                >
                  <MessageCircle size={28} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Nombre</label>
                    <input 
                      type="text" 
                      placeholder="Tu nombre completo"
                      className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-blue-600 focus:bg-white/10 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="tu@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-blue-600 focus:bg-white/10 transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Servicio de Interés</label>
                  <div className="relative">
                    <select className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-blue-600 focus:bg-white/10 transition-all appearance-none font-medium cursor-pointer">
                      {siteData.services.map(s => (
                        <option key={s.id} className="bg-slate-900">{s.title}</option>
                      ))}
                      <option className="bg-slate-900">Otro Proyecto Especial</option>
                    </select>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <Send size={16} className="rotate-90" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Mensaje</label>
                  <textarea 
                    rows={5}
                    placeholder="Cuéntanos los detalles de tu proyecto..."
                    className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-blue-600 focus:bg-white/10 transition-all resize-none font-medium"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] text-lg uppercase tracking-widest"
                >
                  Enviar Mensaje
                  <Send size={20} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
