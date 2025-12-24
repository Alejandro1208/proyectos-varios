import React, { useRef } from 'react';
import { Youtube, Linkedin, Instagram, MessageCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppData } from '../hooks/useAppData';

const Contact: React.FC = () => {
  const { data, loading, error } = useAppData();
  const socials = data?.socials ?? [];
  const videos = data?.videos ?? [];
  const email = data?.profile?.email;
  const scrollRef = useRef<HTMLDivElement>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">
        Cargando información...
      </div>
    );
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin': return <Linkedin className="w-6 h-6" />;
      case 'Instagram': return <Instagram className="w-6 h-6" />;
      case 'MessageCircle': return <MessageCircle className="w-6 h-6" />;
      default: return <ExternalLink className="w-6 h-6" />;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* YouTube Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
             <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              <Youtube className="text-red-500 w-10 h-10" />
              Mi Canal de YouTube
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Conoce mi historia y mis tutoriales. Aunque ya no subo contenido frecuentemente, estos videos reflejan mi pasión por enseñar y compartir.
            </p>
            {error && (
              <p className="text-amber-200 text-sm bg-amber-500/10 border border-amber-500/30 inline-block px-3 py-2 rounded">
                {error}
              </p>
            )}
          </div>

          <div className="relative w-full group/carousel">
             
             {/* Header Controls for Mobile (Visible on mobile/tablet) */}
             <div className="flex justify-end gap-2 mb-4 md:hidden">
                <button onClick={() => scroll('left')} className="p-2 bg-slate-800 rounded-full border border-slate-700 text-white hover:bg-indigo-600 transition-colors shadow-lg">
                 <ChevronLeft className="w-5 h-5" />
               </button>
               <button onClick={() => scroll('right')} className="p-2 bg-slate-800 rounded-full border border-slate-700 text-white hover:bg-indigo-600 transition-colors shadow-lg">
                 <ChevronRight className="w-5 h-5" />
               </button>
             </div>

             {/* Floating Navigation Buttons (Desktop) */}
             <button 
                onClick={() => scroll('left')} 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-slate-900/80 backdrop-blur-sm text-white rounded-full border border-slate-700 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-indigo-600 -ml-4 shadow-2xl hidden md:flex"
              >
                <ChevronLeft className="w-6 h-6" />
             </button>

             <button 
                onClick={() => scroll('right')} 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-slate-900/80 backdrop-blur-sm text-white rounded-full border border-slate-700 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-indigo-600 -mr-4 shadow-2xl hidden md:flex"
              >
                <ChevronRight className="w-6 h-6" />
             </button>

             <div 
               ref={scrollRef}
               className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar scroll-smooth"
             >
              {videos.map((video) => (
                <div 
                  key={video.id} 
                  className="snap-center shrink-0 w-[85vw] sm:w-[480px] bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700"
                >
                  <div className="aspect-w-16 aspect-h-9 w-full">
                    <iframe 
                      src={`https://www.youtube.com/embed/${video.id}`} 
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full min-h-[250px] sm:min-h-[270px]"
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white text-lg">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-slate-800"></div>

        {/* Contact Form & Socials */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Conectemos</h2>
            <p className="text-slate-400 text-lg">
              ¿Tienes un proyecto en mente o simplemente quieres charlar? Estoy disponible para nuevas oportunidades.
            </p>
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-indigo-500/25"
              >
                Escríbeme a {email}
              </a>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {socials.map((social) => (
              <a 
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center p-4 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-indigo-500 transition-all group"
              >
                <div className="p-3 bg-slate-900 rounded-full text-indigo-400 group-hover:text-white transition-colors">
                  {getIcon(social.icon)}
                </div>
                <span className="ml-4 text-lg font-medium text-white">{social.platform}</span>
              </a>
            ))}
            {socials.length === 0 && (
              <p className="text-slate-500">Aún no hay redes sociales cargadas.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;
