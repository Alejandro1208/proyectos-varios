
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, Heart } from 'lucide-react';
import { useAppStore } from '../store';
import { AppStep } from '../types';
import { playClickSFX } from '../utils/audio';

const FinalScreen: React.FC = () => {
  const { setStep } = useAppStore();

  const handleBack = () => {
    playClickSFX();
    setStep(AppStep.HOME);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-gray-950 p-6 text-center transition-colors duration-500"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
        transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.2 }}
        className="w-32 h-32 bg-emerald-100 dark:bg-emerald-900/30 rounded-[2.5rem] flex items-center justify-center mb-8 text-emerald-500 shadow-xl shadow-emerald-200/20 dark:shadow-none"
      >
        <Trophy size={60} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-md mx-auto"
      >
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">Pausa Completada</h1>
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500/20" />
          <Heart className="text-rose-400 mb-4 mx-auto" size={24} />
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-bold leading-tight">
            "No hace falta sentirse perfecto. Con un poco más de calma, ya es suficiente para dar el primer paso."
          </p>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBack}
        className="bg-gray-900 dark:bg-white text-white dark:text-gray-950 px-10 py-5 rounded-[2rem] text-lg font-black flex items-center gap-3 shadow-2xl transition-all"
      >
        Volver a mi tarea
        <ArrowRight size={22} />
      </motion.button>
    </motion.div>
  );
};

export default FinalScreen;
