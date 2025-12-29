
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { AppStep } from '../types';
import { playPopSFX } from '../utils/audio';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const COLORS = ['bg-rose-200', 'bg-emerald-200', 'bg-amber-200', 'bg-violet-200', 'bg-sky-200'];

const BubbleGame: React.FC = () => {
  const { setStep } = useAppStore();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      size: Math.random() * 30 + 70,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setBubbles(newBubbles);
    setIsInitialized(true);
  }, []);

  const popBubble = (id: number) => {
    playPopSFX();
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  useEffect(() => {
    if (isInitialized && bubbles.length === 0) {
      const timer = setTimeout(() => setStep(AppStep.TOGGLES), 1200);
      return () => clearTimeout(timer);
    }
  }, [bubbles, isInitialized, setStep]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-slate-50 dark:bg-gray-950 overflow-hidden transition-colors duration-500"
    >
      <div className="absolute top-28 left-0 right-0 text-center z-10 px-6">
        <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">Ruido Visual</h2>
        <p className="text-gray-400 dark:text-gray-500 font-bold text-sm max-w-xs mx-auto">Está bien sentir caos. Vamos a despejarlo poco a poco.</p>
      </div>

      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.button
            key={bubble.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            exit={{ scale: 2, opacity: 0, filter: 'blur(10px)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => popBubble(bubble.id)}
            className={`absolute rounded-full shadow-lg flex items-center justify-center cursor-pointer border-2 border-white/20 dark:border-white/10 ${bubble.color}`}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: bubble.size,
              height: bubble.size,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-1/3 h-1/3 bg-white/30 rounded-full absolute top-1/4 left-1/4" />
          </motion.button>
        ))}
      </AnimatePresence>

      {isInitialized && bubbles.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-screen"
        >
          <div className="bg-emerald-500 text-white px-10 py-4 rounded-[2rem] font-black text-xl shadow-2xl">
            ¡MENTE LIMPIA! ✨
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BubbleGame;
