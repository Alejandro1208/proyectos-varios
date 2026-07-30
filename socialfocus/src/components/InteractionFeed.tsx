/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Inbox, History } from 'lucide-react';
import { Thread, Platform } from '../types';
import ThreadCard from './ThreadCard';

interface InteractionFeedProps {
  threads: Thread[];
  onMarkAsRead: (id: string) => void;
  onSelectThread: (thread: Thread) => void;
}

const PLATFORMS: (Platform | 'All')[] = ['All', 'Facebook', 'Instagram', 'TikTok', 'X', 'Reddit'];

export default function InteractionFeed({ 
  threads, 
  onMarkAsRead, 
  onSelectThread 
}: InteractionFeedProps) {
  const [activeTab, setActiveTab] = useState<Platform | 'All'>('All');

  const filteredThreads = threads
    .filter(t => activeTab === 'All' ? true : t.platform === activeTab)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const activeThreads = filteredThreads.filter(t => !t.isRead);
  const managedThreads = filteredThreads.filter(t => t.isRead);

  return (
    <div className="flex flex-col gap-12">
      {/* Platform Tabs */}
      <div className="flex justify-center mb-4">
        <div className="relative inline-flex items-center gap-1.5 bg-zinc-200/60 dark:bg-zinc-900/40 p-1.5 rounded-full border border-zinc-300 dark:border-white/5 max-w-full overflow-x-auto scrollbar-none snap-x snap-mandatory shadow-sm dark:shadow-2xl">
          {PLATFORMS.map((platform) => (
            <button
              key={platform}
              onClick={() => setActiveTab(platform)}
              className={`relative px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap snap-center ${
                activeTab === platform 
                  ? 'text-zinc-900 dark:text-white' 
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              {activeTab === platform && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white dark:bg-white/10 rounded-full z-0 shadow-sm dark:shadow-inner"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{platform === 'All' ? 'Global' : platform}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          {/* CAMBIO: bg-zinc-300 para el separador en modo claro */}
          <div className="w-8 h-px bg-zinc-300 dark:bg-white/10" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
            Debates Pendientes
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {activeThreads.length > 0 ? (
              activeThreads.map((thread) => (
                <ThreadCard 
                  key={thread.id} 
                  thread={thread} 
                  onMarkAsRead={onMarkAsRead}
                  onSelect={() => onSelectThread(thread)}
                />
              ))
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-zinc-100/50 dark:bg-white/[0.02] border-2 border-dashed border-zinc-200 dark:border-zinc-800/50 rounded-[40px]"
              >
                <div className="p-5 bg-emerald-500/5 rounded-full mb-4">
                  <Inbox className="w-8 h-8 text-emerald-600 dark:text-emerald-500 opacity-40" />
                </div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Inbox Zero Alcanzado</h4>
                <p className="text-zinc-500 text-xs max-w-xs mx-auto font-medium">
                  Has gestionado todo el ruido. Revisa el historial abajo para referencias pasadas.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Managed Section */}
      {managedThreads.length > 0 && (
        <div id="managed-section" className="flex flex-col gap-6 pt-12 border-t border-zinc-200 dark:border-zinc-900 scroll-mt-24">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-px bg-zinc-300 dark:bg-white/10" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 flex items-center gap-2">
               <History className="w-3 h-3" /> Debates Gestionados
             </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {managedThreads.map((thread) => (
              <ThreadCard 
                key={thread.id} 
                thread={thread} 
                onMarkAsRead={onMarkAsRead}
                onSelect={() => onSelectThread(thread)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}