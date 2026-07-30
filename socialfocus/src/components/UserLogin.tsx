import { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface UserLoginProps {
  onSetUser: (username: string) => void;
}

export default function UserLogin({ onSetUser }: UserLoginProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) onSetUser(username.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-[40px] border border-white/5 bg-zinc-900/50 backdrop-blur-xl shadow-2xl"
      >
        <div className="w-16 h-16 bg-[#FF4500]/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
          <User className="w-8 h-8 text-[#FF4500]" />
        </div>
        
        <h2 className="text-2xl font-black text-white text-center mb-2 uppercase tracking-tighter">
          SocialFocus Reddit
        </h2>
        <p className="text-zinc-500 text-center text-sm mb-8 font-medium">
          Ingresá tu usuario para monitorear debates.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ej: Pale_Focus_9466"
            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#FF4500]/50 transition-all text-center font-bold tracking-wide"
          />
          <button
            type="submit"
            className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            Ver Respuestas <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}