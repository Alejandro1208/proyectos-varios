
import React, { useState } from 'react';
import { Lock, User, ArrowLeft } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const Login: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'ventas@growsestore.com' && password === 'Growsestore2026') {
      onSuccess();
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F2F2F2] z-[100] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button onClick={onCancel} className="flex items-center gap-2 text-[#8C8C8C] hover:text-[#0D0D0D] mb-10 transition-colors">
          <ArrowLeft size={20} />
          Volver al inicio
        </button>

        <h2 className="text-4xl font-bold tracking-tight mb-2 text-[#0E0F26]">Acceso Admin</h2>
        <p className="text-[#8C8C8C] mb-8">Ingresá tus credenciales para gestionar el catálogo.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-[#0E0F26]">Usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8C8C]" size={20} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-[#8C8C8C]/30 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-[#BF926B] outline-none transition-all"
                placeholder="ventas@growsestore.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-[#0E0F26]">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8C8C]" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#8C8C8C]/30 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-[#BF926B] outline-none transition-all"
                placeholder="••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

          <button 
            type="submit"
            className="w-full py-4 bg-[#BF926B] text-[#0D0D0D] rounded-xl font-bold text-lg hover:brightness-105 transition-all shadow-md shadow-black/10"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
