
export enum AppStep {
  HOME = 'HOME',
  BREATHING = 'BREATHING',
  BUBBLES = 'BUBBLES',
  TOGGLES = 'TOGGLES',
  FINAL = 'FINAL',
  PROFILE = 'PROFILE'
}

export type NoiseType = 'brown' | 'pink' | 'white';

export interface User {
  name: string;
  avatar: string;
  totalBreaks: number;
}

export interface AppState {
  currentStep: AppStep;
  isBrownNoisePlaying: boolean;
  isDarkMode: boolean;
  isLoggedIn: boolean;
  user: User;
  streak: number;
  noiseType: NoiseType;
  favorites: AppStep[];
  setStep: (step: AppStep) => void;
  toggleBrownNoise: () => void;
  toggleDarkMode: () => void;
  toggleLogin: () => void;
  incrementStreak: () => void;
  setNoiseType: (type: NoiseType) => void;
  toggleFavorite: (step: AppStep) => void;
}
