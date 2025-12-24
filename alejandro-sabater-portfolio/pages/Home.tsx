import React from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import { ArrowRight, User } from 'lucide-react';
import { useAppData } from '../hooks/useAppData';

const Home: React.FC = () => {
  const { data, loading, error } = useAppData();
  const profile = data?.profile;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">
        Cargando información...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">
        No se pudo cargar el perfil.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-[-10%] w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Col: Text & Buttons */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-fade-in">
          
          {error && (
            <div className="w-full p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
             <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm">
              {profile.role}
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              Hola, soy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                {profile.name}
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl">
              {profile.bioShort}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Link to specific section hash */}
            <Link 
              to="/about#projects" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg transition-all shadow-lg hover:shadow-indigo-500/25"
            >
              Ver Proyectos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/about#bio" 
              className="inline-flex items-center justify-center px-8 py-3 border border-slate-600 text-base font-medium rounded-lg text-slate-300 hover:bg-slate-800 md:py-4 md:text-lg transition-all"
            >
              Sobre mí
              <User className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Right Col: Photo/Code Block */}
        <div className="order-1 lg:order-2 flex flex-col items-center justify-center space-y-8">
          {/* Avatar (visible mostly on desktop, or top on mobile) */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={profile.avatarUrl} 
              alt={profile.name} 
              className="relative w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full border-4 border-slate-900 shadow-2xl"
            />
          </div>

          <div className="w-full flex justify-center lg:justify-end">
             <CodeBlock />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
