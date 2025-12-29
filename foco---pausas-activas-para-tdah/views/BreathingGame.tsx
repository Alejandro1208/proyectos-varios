
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { AppStep } from '../types';

const BreathingGame: React.FC = () => {
  const { setStep } = useAppStore();
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => {
        if (prev === 'inhale') return 'exhale';
        else {
          setCycles((c) => c + 1);
          return 'inhale';
        }
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (cycles >= 3) {
      const timeout = setTimeout(() => setStep(AppStep.BUBBLES), 1000);
      return () => clearTimeout(timeout);
    }
  }, [cycles, setStep]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-500"
    >
      <div className="absolute top-24 text-gray-400 dark:text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">
        Calibrando Sistema • Ciclo {Math.min(cycles + 1, 3)} / 3
      </div>

      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: phase === 'inhale' ? 1.6 : 0.7,
            backgroundColor: phase === 'inhale' ? 'rgba(186, 230, 253, 0.4)' : 'rgba(224, 242, 254, 0.2)',
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="w-56 h-56 rounded-full border border-sky-200 dark:border-sky-800 shadow-[0_0_50px_rgba(186,230,253,0.3)] dark:shadow-none"
        />
        
        <div className="absolute">
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -10 }}
              className="text-3xl font-black text-sky-600 dark:text-sky-300 tracking-tighter"
            >
              {phase === 'inhale' ? 'Inhala' : 'Exhala'}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-24 max-w-xs text-center px-6">
        <p className="text-sky-400 dark:text-sky-600 text-sm font-bold leading-relaxed">
          Deja que el ritmo te guíe. Tu cuerpo sabe qué hacer.
        </p>
      </div>
    </motion.div>
  );
};

export default BreathingGame;
