
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { AppStep } from '../types';
import { AngrySquirrelSvg, CalmSquirrelSvg } from './Mascot';

const AvatarCharacter: React.FC = () => {
  const { currentStep } = useAppStore();

  const isZen = currentStep === AppStep.FINAL;
  const isProfile = currentStep === AppStep.PROFILE;

  if (isProfile) return null;

  const messages = {
    [AppStep.HOME]: "Mi cabeza va a mil por hora... necesito una pausa.",
    [AppStep.BREATHING]: "Uff... se siente bien bajar el ritmo.",
    [AppStep.BUBBLES]: "Uff... se siente bien bajar el ritmo.",
    [AppStep.TOGGLES]: "Uff... se siente bien bajar el ritmo.",
    [AppStep.FINAL]: "Estamos listos. Un paso a la vez.",
  };

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 pointer-events-none flex flex-col items-start gap-1"
    >
      <div className="relative mb-2">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -5 }}
            className="bg-white dark:bg-gray-800 dark:text-gray-100 px-3 py-1.5 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 pointer-events-auto min-w-[80px] max-w-[140px] sm:max-w-[200px]"
          >
            <p className="text-[10px] sm:text-[12px] font-bold text-gray-700 dark:text-gray-200 leading-tight text-center">
              {messages[currentStep as keyof typeof messages] || "..."}
            </p>
            {/* Triangulito del globo posicionado para no tapar a la ardilla */}
            <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-white dark:bg-gray-800 border-r border-b border-gray-100 dark:border-gray-700 rotate-45" />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        key={isZen ? 'calm' : 'angry'}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isZen ? {
          y: [0, -3, 0],
          opacity: 1
        } : {
          x: [-0.5, 0.5, -0.5, 0.5, 0],
          scale: 1,
          opacity: 1
        }}
        transition={isZen ? {
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut"
        } : {
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        }}
        className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center pointer-events-none"
      >
        {isZen ? <CalmSquirrelSvg /> : <AngrySquirrelSvg />}
      </motion.div>
    </motion.div>
  );
};

export default AvatarCharacter;
