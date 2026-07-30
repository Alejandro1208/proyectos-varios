import { useState, useEffect } from 'react';
import EfficiencyDashboard from './components/EfficiencyDashboard';
import InteractionFeed from './components/InteractionFeed';
import UserLogin from './components/UserLogin';
import { Thread } from './types';
import { Sun, Moon, Loader2 } from 'lucide-react'; // Añadido Loader2 para la carga

import InstagramView from './redes/InstagramView';
import FacebookView from './redes/FacebookView';
import XView from './redes/XView';

export default function App() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  
  // Estado para el usuario de Reddit
  const [currentUser, setCurrentUser] = useState<string | null>(localStorage.getItem('reddit_user'));
  
  // NUEVO: Estado para controlar la pantalla de carga
  const [isLoading, setIsLoading] = useState(false);

  const fetchThreads = async () => {
    if (!currentUser) return;

    // Solo mostramos el loader si no tenemos hilos previos (primera carga o cambio de usuario)
    if (threads.length === 0) setIsLoading(true);

    try {
        const response = await fetch(`http://localhost:8000/get_reddit_threads.php?user=${currentUser}`);
        const data = await response.json();
        
        setThreads(Array.isArray(data) ? data : []);
    } catch (error) {
        console.error("Error al sincronizar:", error);
        setThreads([]); 
    } finally {
        // Finalizamos el estado de carga independientemente del resultado
        setIsLoading(false);
    }
};

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    fetchThreads();
    const interval = setInterval(fetchThreads, 60000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleMarkAsRead = (id: string) => {
    setThreads(prev => prev.map(t => t.id === id ? { ...t, isRead: true } : t));
  };

  const handleSetUser = (username: string) => {
    localStorage.setItem('reddit_user', username);
    setCurrentUser(username);
    setThreads([]); // Limpiamos hilos para forzar el estado de carga con el nuevo usuario
  };

  const handleLogout = () => {
    localStorage.removeItem('reddit_user');
    setCurrentUser(null);
    setThreads([]);
  };

  if (!currentUser) {
    return <UserLogin onSetUser={handleSetUser} />;
  }

  return (
    <div className="relative min-h-screen transition-colors duration-500 bg-zinc-50 dark:bg-black selection:bg-indigo-500/30 selection:text-zinc-900 dark:selection:text-white">
      
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-600/5 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/5 blur-[160px] rounded-full pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-12 pt-12">
        {!selectedThread ? (
          <>
            <EfficiencyDashboard />
            <section className="mt-16">
              {/* LÓGICA DE CARGA: Si está cargando, muestra el spinner; si no, el feed */}
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 animate-in fade-in duration-500">
                  <Loader2 className="w-10 h-10 text-[#FF4500] animate-spin mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                    Sincronizando debates...
                  </p>
                </div>
              ) : (
                <InteractionFeed 
                  threads={threads} 
                  onMarkAsRead={handleMarkAsRead} 
                  onSelectThread={setSelectedThread} 
                />
              )}
            </section>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-10">
            {selectedThread.platform === 'Instagram' && (
              <InstagramView thread={selectedThread} onBack={() => setSelectedThread(null)} />
            )}
            {(selectedThread.platform === 'Facebook' || selectedThread.platform === 'Meta') && (
              <FacebookView thread={selectedThread} onBack={() => setSelectedThread(null)} />
            )}
            {selectedThread.platform === 'X' && (
              <XView thread={selectedThread} onBack={() => setSelectedThread(null)} />
            )}
          </div>
        )}

        <footer className="mt-32 pt-8 border-t border-zinc-200 dark:border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 dark:text-zinc-600">
          
          <div className="flex gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-sm hover:border-indigo-500/50 transition-all group"
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-yellow-500 group-hover:rotate-45 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-200">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-500 group-hover:-rotate-12 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900">Modo Oscuro</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-sm hover:border-red-500/50 transition-all group"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Cambiar Usuario</span>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] uppercase font-bold text-zinc-700 dark:text-zinc-300">Sincronizando: {currentUser}</span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">SocialFocus v1.0</p>
          </div>
        </footer>
      </main>
    </div>
  );
}