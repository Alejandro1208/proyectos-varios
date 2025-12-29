
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, User, LogIn, LayoutGrid } from 'lucide-react';
import { useAppStore } from '../store';
import { AppStep } from '../types';

const LinkedInLogo = () => (
  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px">
    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/>
  </svg>
);

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode, isLoggedIn, toggleLogin, user, setStep } = useAppStore();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-6 z-50 backdrop-blur-md bg-white/30 dark:bg-stone-900/30">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          onClick={() => setStep(AppStep.HOME)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200/50">
            <LayoutGrid size={20} />
          </div>
          <span className="text-2xl font-black text-stone-800 dark:text-white tracking-tighter">FOCO</span>
        </motion.div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-3 rounded-2xl bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 shadow-sm border border-stone-100 dark:border-stone-700 hover:bg-stone-50 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isLoggedIn ? (
            <button 
              onClick={() => setStep(AppStep.PROFILE)}
              className="flex items-center gap-2 pl-2 pr-4 py-2 rounded-2xl bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 shadow-sm overflow-hidden"
            >
              <img src={user.avatar} alt="User" className="w-8 h-8 rounded-xl bg-emerald-50" />
              <span className="text-sm font-bold text-stone-700 dark:text-stone-200 hidden sm:block">Perfil</span>
            </button>
          ) : (
            <button 
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-3 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-bold flex items-center gap-2 shadow-xl"
            >
              <LogIn size={18} />
              Ingresar
            </button>
          )}
        </div>
      </header>

      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-stone-900 p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm relative z-10"
            >
              <h2 className="text-2xl font-bold text-stone-800 dark:text-white mb-2 text-center">Bienvenido de nuevo</h2>
              <p className="text-stone-400 text-center mb-8 text-sm">Sincroniza tu progreso</p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => { toggleLogin(); setShowLoginModal(false); }}
                  className="w-full py-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-bold flex items-center justify-center gap-3 hover:bg-stone-50"
                >
                  <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="G" />
                  Google
                </button>
                <button 
                  onClick={() => { toggleLogin(); setShowLoginModal(false); }}
                  className="w-full py-4 rounded-2xl bg-[#0077b5] text-white font-bold flex items-center justify-center gap-3 hover:bg-[#005582]"
                >
                  <LinkedInLogo />
                  LinkedIn
                </button>
              </div>

              <button 
                onClick={() => setShowLoginModal(false)}
                className="mt-8 w-full text-stone-400 text-sm font-medium hover:text-stone-600"
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
