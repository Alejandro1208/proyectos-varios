import { Thread } from '../types';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface Props {
  thread: Thread;
  onBack: () => void;
}

export default function InstagramView({ thread, onBack }: Props) {
  return (
    <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-300">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 mb-6 hover:text-white transition-colors">
        <ArrowLeft size={18} /> <span className="text-xs font-bold uppercase tracking-widest">Volver</span>
      </button>

      <div className="bg-black border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" />
          <span className="text-sm font-bold">Instagram / Debate</span>
        </div>

        <div className="p-6 space-y-6">
          <div className="opacity-50 italic text-sm border-l-2 border-pink-500/30 pl-4">
            <span className="block text-[10px] font-black uppercase mb-1">Tu comentario:</span>
            "{thread.myOriginalComment}"
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 grayscale opacity-30 mb-2">
              <div className="w-4 h-px bg-white" />
              <span className="text-[9px] font-black uppercase tracking-widest">Respuesta Activa</span>
            </div>
            <h2 className="text-2xl font-medium leading-tight">"{thread.latestReply}"</h2>
            <p className="text-xs text-zinc-500 font-bold">Y {thread.replyCount || 0} respuestas más en el hilo...</p>
          </div>
        </div>

        <div className="p-6 pt-0">
          <a href={thread.deepLink} target="_blank" rel="noopener noreferrer" 
             className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-sm hover:opacity-90 transition-opacity">
            Responder en App <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}