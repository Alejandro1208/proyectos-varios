import { Thread } from '../types';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function XView({ thread, onBack }: { thread: Thread, onBack: () => void }) {
  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 mb-6 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">
        <ArrowLeft size={16} /> Dashboard
      </button>

      <div className="bg-black border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-white/10">𝕏</div>
          <div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter">Hilo de Debate</p>
            <p className="text-sm font-bold">{thread.postContext}</p>
          </div>
        </div>

        <div className="relative pl-6 border-l-2 border-zinc-800 space-y-10">
          <div className="relative">
             <div className="absolute -left-[31px] top-1 w-2 h-2 rounded-full bg-zinc-800" />
             <p className="text-zinc-500 italic text-sm">"{thread.myOriginalComment}"</p>
          </div>
          <div className="relative">
             <div className="absolute -left-[31px] top-1 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
             <h2 className="text-xl font-bold leading-tight text-white">"{thread.latestReply}"</h2>
          </div>
        </div>

        <div className="mt-12">
          <a href={thread.deepLink} target="_blank" rel="noopener noreferrer" 
             className="flex items-center justify-center gap-2 w-full py-3.5 bg-white text-black rounded-full font-black text-sm hover:bg-zinc-200 transition-colors">
            Postear Respuesta <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}