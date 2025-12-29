
import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Waves, Heart, ArrowLeft, BarChart3, Star } from 'lucide-react';
import { useAppStore } from '../store';
import { AppStep, NoiseType } from '../types';
import { playClickSFX } from '../utils/audio';

const Profile: React.FC = () => {
  const { user, streak, noiseType, setNoiseType, setStep, favorites } = useAppStore();

  const noiseOptions: {id: NoiseType, label: string, color: string}[] = [
    { id: 'brown', label: 'Marrón Profundo', color: 'bg-stone-600' },
    { id: 'pink', label: 'Rosa Suave', color: 'bg-rose-400' },
    { id: 'white', label: 'Blanco Puro', color: 'bg-blue-300' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen bg-stone-50 dark:bg-stone-900 pt-24 pb-12 px-6"
    >
      <div className="max-w-md mx-auto">
        <button 
          onClick={() => setStep(AppStep.HOME)}
          className="mb-8 flex items-center gap-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-bold"
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <div className="relative mb-8">
          <div className="h-32 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-[2rem] overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60" className="w-full h-full object-cover opacity-50" alt="Banner" />
          </div>
          <div className="absolute -bottom-6 left-6 flex items-end gap-4">
            <div className="w-24 h-24 rounded-3xl bg-white dark:bg-stone-800 p-1 border-4 border-stone-50 dark:border-stone-900 shadow-xl">
              <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-2xl bg-emerald-50" />
            </div>
            <div className="pb-2">
              <h2 className="text-2xl font-black text-stone-800 dark:text-white leading-none">{user.name}</h2>
              <p className="text-stone-500 text-sm font-bold">@alex_foco</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 pt-6">
          <div className="bg-white dark:bg-stone-800 p-5 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-700">
            <div className="bg-orange-100 dark:bg-orange-950/50 w-10 h-10 rounded-xl flex items-center justify-center text-orange-500 mb-3">
              <BarChart3 size={20} />
            </div>
            <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest">Pausas Totales</p>
            <p className="text-2xl font-black text-stone-800 dark:text-white">{user.totalBreaks}</p>
          </div>
          <div className="bg-white dark:bg-stone-800 p-5 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-700">
            <div className="bg-emerald-100 dark:bg-emerald-950/50 w-10 h-10 rounded-xl flex items-center justify-center text-emerald-500 mb-3">
              <Star size={20} />
            </div>
            <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest">Logros</p>
            <p className="text-2xl font-black text-stone-800 dark:text-white">12/30</p>
          </div>
        </div>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-stone-400 uppercase text-xs font-black tracking-widest">
            <Waves size={14} /> Configuración de Ruido
          </div>
          <div className="grid grid-cols-1 gap-3">
            {noiseOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { playClickSFX(); setNoiseType(opt.id); }}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 ${
                  noiseType === opt.id 
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' 
                    : 'border-stone-100 dark:border-stone-700 bg-white dark:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${opt.color}`} />
                  <span className={`font-bold ${noiseType === opt.id ? 'text-emerald-700 dark:text-emerald-200' : 'text-stone-600 dark:text-stone-400'}`}>
                    {opt.label}
                  </span>
                </div>
                {noiseType === opt.id && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-stone-400 uppercase text-xs font-black tracking-widest">
            <Heart size={14} /> Mis Favoritos
          </div>
          <div className="bg-white dark:bg-stone-800 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-700 text-center">
            {favorites.length === 0 ? (
              <p className="text-stone-400 text-sm italic">Aún no has guardado juegos como favoritos.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {favorites.map(f => (
                   <span key={f} className="px-4 py-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-200 rounded-xl text-xs font-bold uppercase tracking-widest">
                     {f.toLowerCase()}
                   </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <button className="w-full py-5 rounded-[2rem] bg-stone-100 dark:bg-stone-800 text-stone-400 font-bold border border-stone-200 dark:border-stone-700 opacity-50 cursor-not-allowed flex items-center justify-center gap-2">
          <Settings size={18} />
          Editar Perfil
        </button>
      </div>
    </motion.div>
  );
};

export default Profile;
