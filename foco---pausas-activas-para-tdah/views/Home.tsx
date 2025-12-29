
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Leaf } from 'lucide-react';
import { useAppStore } from '../store';
import { AppStep } from '../types';
import { playClickSFX } from '../utils/audio';

const Home: React.FC = () => {
  const { setStep } = useAppStore();

  const handleStart = () => {
    playClickSFX();
    setStep(AppStep.BREATHING);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center pt-24 bg-slate-50 dark:bg-gray-950 transition-colors duration-500"
    >
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="mb-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-[2.5rem] inline-flex items-center justify-center shadow-inner"
      >
        <Leaf className="text-emerald-500" size={48} />
      </motion.div>
      
      <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 max-w-lg leading-none tracking-tight">
        Reconecta con tu <span className="text-emerald-500">Foco</span>
      </h1>
      
      <p className="text-gray-500 dark:text-gray-400 text-lg mb-12 max-w-sm font-medium">
        Una pausa de 2 minutos diseñada para que tu cerebro TDAH encuentre calma.
      </p>

      <div className="relative group mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="relative bg-emerald-500 text-white px-12 py-7 rounded-[2.5rem] text-xl font-black shadow-2xl shadow-emerald-200/50 dark:shadow-none flex items-center gap-4 transition-all"
        >
          <Play fill="currentColor" size={24} />
          Empezar Viaje
        </motion.button>
      </div>

      <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
        Tu espacio seguro para reiniciar.
      </p>
    </motion.div>
  );
};

export default Home;
