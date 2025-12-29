
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Zap } from 'lucide-react';
import { useAppStore } from '../store';
import { AppStep } from '../types';
import { playClickSFX } from '../utils/audio';

const ToggleGame: React.FC = () => {
  const { setStep } = useAppStore();
  const [toggles, setToggles] = useState<boolean[]>([false, false, true, false, true, false]);

  const toggleSwitch = (index: number) => {
    playClickSFX();
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
  };

  const allOn = toggles.every(t => t === true);

  useEffect(() => {
    if (allOn) {
      // Fix: Rename timer to timeout to match variable declaration
      const timeout = setTimeout(() => setStep(AppStep.FINAL), 1500);
      return () => clearTimeout(timeout);
    }
  }, [allOn, setStep]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-gray-950 p-6 pt-24 transition-colors duration-500"
    >
      <div className="mb-12 text-center px-4">
        <div className="inline-flex p-4 bg-amber-100 dark:bg-amber-900/30 rounded-[2rem] text-amber-500 mb-6 shadow-sm">
          <Zap size={28} />
        </div>
        <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2 tracking-tight">Recuperando el Control</h2>
        <p className="text-gray-500 dark:text-gray-400 font-bold text-sm max-w-xs mx-auto">
          No hace falta hacerlo todo ya. Solo un paso a la vez.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-sm">
        {toggles.map((isOn, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleSwitch(idx)}
            className={`h-40 rounded-[2.5rem] flex flex-col items-center justify-between p-6 transition-all duration-500 shadow-xl border ${
              isOn 
                ? 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none border-emerald-400' 
                : 'bg-white dark:bg-gray-800 text-gray-300 dark:text-gray-700 shadow-stone-200/50 dark:shadow-none border-gray-100 dark:border-gray-700'
            }`}
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
              isOn ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,1)]' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
            
            <span className="text-[10px] font-black uppercase tracking-[0.25em]">
              {isOn ? 'Core ON' : 'Core OFF'}
            </span>
            
            <div className={`w-full h-14 rounded-2xl relative transition-colors duration-500 overflow-hidden ${
              isOn ? 'bg-emerald-600' : 'bg-gray-100 dark:bg-gray-900'
            }`}>
              <motion.div 
                animate={{ y: isOn ? 6 : 30 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-12 h-8 bg-white dark:bg-gray-200 rounded-xl shadow-md mx-auto absolute left-0 right-0"
              />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {allOn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-lg bg-emerald-50 dark:bg-emerald-900/30 px-8 py-4 rounded-full border border-emerald-100 dark:border-emerald-900/50"
          >
            <CheckCircle2 size={24} />
            CONEXIÓN ESTABLE
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToggleGame;
