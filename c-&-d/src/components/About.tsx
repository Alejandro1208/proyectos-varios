import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Award, Users, Zap } from 'lucide-react';
import siteData from '../data.json';

export const About = () => {
  const iconMap: Record<string, any> = { Award, Users, Zap };

  return (
    <section id="empresa" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-6 block"
            >
              {siteData.about.subtitle}
            </motion.span>
            <h2 className="text-5xl md:text-6xl text-slate-900 mb-10 font-display font-black tracking-tight leading-tight">
              {siteData.about.title}
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed mb-12 font-medium">
              {siteData.about.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {siteData.about.items.map((text, i) => (
                <motion.div 
                  key={text} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
                    <CheckCircle2 className="text-white w-5 h-5" />
                  </div>
                  <span className="text-slate-800 font-bold text-sm leading-tight">{text}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
              {siteData.about.stats.map((stat, i) => {
                const Icon = iconMap[stat.label.includes('Calidad') ? 'Award' : stat.label.includes('Clientes') ? 'Users' : 'Zap'];
                return (
                  <motion.div 
                    key={i} 
                    className="text-center group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <p className="text-3xl font-display font-black text-slate-900 leading-none mb-2">{stat.value}</p>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                src={siteData.about.image} 
                alt="Nuestro Taller" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Decorative blobs */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -z-0" 
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px] -z-0" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
