
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAppStore } from '../store';
import { AppStep } from '../types';

interface Props {
  step: AppStep;
}

const FavoriteButton: React.FC<Props> = ({ step }) => {
  const { favorites, toggleFavorite } = useAppStore();
  const isFav = favorites.includes(step);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => toggleFavorite(step)}
      className="fixed top-24 right-6 z-30 p-4 rounded-2xl bg-white/50 dark:bg-stone-800/50 backdrop-blur-md border border-stone-100 dark:border-stone-700 shadow-sm text-rose-500"
    >
      <Heart size={20} fill={isFav ? "currentColor" : "none"} />
    </motion.button>
  );
};

export default FavoriteButton;
