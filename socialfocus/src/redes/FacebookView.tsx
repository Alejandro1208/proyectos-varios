import { Thread } from '../types';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function FacebookView({ thread, onBack }: { thread: Thread, onBack: () => void }) {
  return (
    <div className="max-w-md mx-auto animate-in fade-in duration-300">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 mb-6 hover:text-white transition-colors">
        <ArrowLeft size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Atrás</span>
      </button>

      <div className="bg-[#18191a] border border-white/5 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-[#242526] p-4 flex items-center justify-between border-b border-white/5">
          <span className="text-[#2e89ff] font-bold text-xs">Conversación de Facebook</span>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-[#3a3b3c] p-4 rounded-2xl inline-block max-w-[90%] border border-white/5">
            <span className="block text-[9px] font-black text-zinc-400 uppercase mb-1">Tú:</span>
            <p className="text-sm opacity-80">"{thread.myOriginalComment}"</p>
          </div>

          <div className="flex justify-end">
            <div className="bg-[#2e89ff] p-5 rounded-2xl max-w-[90%] shadow-lg">
              <h2 className="text-lg font-bold leading-snug">"{thread.latestReply}"</h2>
              <p className="text-[10px] mt-2 font-bold opacity-60 uppercase tracking-widest text-right">Nueva Respuesta</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#242526]">
          <a href={thread.deepLink} target="_blank" rel="noopener noreferrer" 
             className="flex items-center justify-center gap-2 w-full py-3 bg-[#2e89ff] rounded-md font-bold text-sm hover:bg-[#4b97ff] transition-colors">
            Responder en Facebook <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}