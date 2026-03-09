import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import siteData from '../data.json';

export const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="/images/food5.jpeg" 
          alt="Fondo industrial de un taller de fabricación" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            {siteData.company.tagline}
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl text-white mb-8 leading-[1.05] font-display font-black tracking-tight">
            {siteData.company.name.split(' ').slice(0, 3).join(' ')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              {siteData.company.name.split(' ').slice(3).join(' ')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-medium max-w-2xl">
            {siteData.company.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <motion.a 
              href="#servicios"
              className="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[2rem] font-black text-lg transition-all shadow-2xl shadow-blue-600/40"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Nuestros Servicios
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a 
              href="#empresa"
              className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/10 px-10 py-5 rounded-[2rem] font-black text-lg transition-all"
              whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              Conócenos
              <ArrowRight size={22} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Floating Info Card */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ y: -10, rotate: -2 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-black text-2xl">+15</span>
            </div>
            <div>
              <p className="text-white font-black text-xl leading-tight">{siteData.company.experience}</p>
              <p className="text-slate-400 font-bold text-sm mt-1">{siteData.company.experienceSub}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1 h-2 bg-blue-500 rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
