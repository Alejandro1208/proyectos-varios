
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Waves } from 'lucide-react';
import { useAppStore } from '../store';
import { startNoise, stopNoise } from '../utils/audio';

const BrownNoiseControl: React.FC = () => {
  const { isBrownNoisePlaying, toggleBrownNoise, noiseType } = useAppStore();

  useEffect(() => {
    if (isBrownNoisePlaying) {
      startNoise(noiseType);
    } else {
      stopNoise();
    }
    return () => stopNoise();
  }, [isBrownNoisePlaying, noiseType]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      <AnimatePresence>
        {isBrownNoisePlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-stone-900 dark:bg-stone-100 px-4 py-2 rounded-2xl text-[10px] text-white dark:text-stone-900 font-black uppercase tracking-widest shadow-xl flex items-center gap-2"
          >
            <Waves size={14} className="animate-pulse" />
            Ruido {noiseType.toUpperCase()}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleBrownNoise}
        className={`w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 border-2 ${
          isBrownNoisePlaying 
            ? 'bg-orange-500 text-white border-orange-400' 
            : 'bg-white dark:bg-stone-800 text-stone-400 border-stone-100 dark:border-stone-700 shadow-stone-200/50 dark:shadow-none'
        }`}
      >
        {isBrownNoisePlaying ? <Volume2 size={28} /> : <VolumeX size={28} />}
      </motion.button>
    </div>
  );
};

export default BrownNoiseControl;
