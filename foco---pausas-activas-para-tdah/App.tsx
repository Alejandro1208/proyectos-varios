
import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from './store';
import { AppStep } from './types';
import BrownNoiseControl from './components/BrownNoiseControl';
import Header from './components/Header';
import AvatarCharacter from './components/AvatarCharacter';
import FavoriteButton from './components/FavoriteButton';
import Home from './views/Home';
import BreathingGame from './views/BreathingGame';
import BubbleGame from './views/BubbleGame';
import ToggleGame from './views/ToggleGame';
import FinalScreen from './views/FinalScreen';
import Profile from './views/Profile';

const App: React.FC = () => {
  const { currentStep, isDarkMode } = useAppStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderStep = () => {
    switch (currentStep) {
      case AppStep.HOME:
        return <Home />;
      case AppStep.BREATHING:
        return <BreathingGame />;
      case AppStep.BUBBLES:
        return <BubbleGame />;
      case AppStep.TOGGLES:
        return <ToggleGame />;
      case AppStep.FINAL:
        return <FinalScreen />;
      case AppStep.PROFILE:
        return <Profile />;
      default:
        return <Home />;
    }
  };

  const showFavButton = [AppStep.BREATHING, AppStep.BUBBLES, AppStep.TOGGLES].includes(currentStep);

  return (
    <div className="min-h-screen relative overflow-x-hidden select-none transition-colors duration-500 bg-slate-50 dark:bg-gray-950">
      <Header />
      
      <main className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-500">
        <AnimatePresence mode="wait">
          <div key={currentStep}>
            {renderStep()}
          </div>
        </AnimatePresence>
      </main>
      
      {showFavButton && <FavoriteButton step={currentStep} />}
      <AvatarCharacter />
      <BrownNoiseControl />
    </div>
  );
};

export default App;
