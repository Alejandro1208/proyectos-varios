
import { create } from 'zustand';
import { AppState, AppStep } from './types';

export const useAppStore = create<AppState>((set) => ({
  currentStep: AppStep.HOME,
  isBrownNoisePlaying: false,
  isDarkMode: false,
  isLoggedIn: false,
  user: {
    name: "Alex Dev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    totalBreaks: 42
  },
  streak: 3,
  noiseType: 'brown',
  favorites: [],
  setStep: (step: AppStep) => set({ currentStep: step }),
  toggleBrownNoise: () => set((state) => ({ isBrownNoisePlaying: !state.isBrownNoisePlaying })),
  toggleDarkMode: () => set((state) => {
    const next = !state.isDarkMode;
    if (next) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    return { isDarkMode: next };
  }),
  toggleLogin: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
  setNoiseType: (type) => set({ noiseType: type }),
  toggleFavorite: (step) => set((state) => ({
    favorites: state.favorites.includes(step) 
      ? state.favorites.filter(s => s !== step)
      : [...state.favorites, step]
  }))
}));
