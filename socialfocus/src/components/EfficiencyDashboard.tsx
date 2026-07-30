/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { History } from 'lucide-react';

export default function EfficiencyDashboard() {
  return (
    <header className="flex flex-col lg:flex-row items-center justify-between mb-10 gap-6">
      <div className="flex items-center gap-6">
        {/* El logo mantiene su gradiente pero ajustamos la sombra para que no sea tan pesada en modo claro */}
        <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 dark:shadow-indigo-500/40">
          <span className="font-bold text-xl text-white">SF</span>
        </div>
        <div>
          {/* CAMBIO: text-zinc-900 en claro, text-white en oscuro */}
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-tight">
            SocialFocus
          </h1>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em]">
            Console de Interaction
          </p>
        </div>
      </div>

      <button 
        onClick={() => {
          document.getElementById('managed-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex items-center gap-3 px-6 py-3 bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/20 transition-all group"
      >
        <History className="w-3.5 h-3.5 group-hover:rotate-[-20deg] transition-transform" />
        Ver Historial
      </button>
    </header>
  );
}