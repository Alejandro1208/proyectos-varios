import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ExternalLink, Github, Code, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppData } from '../hooks/useAppData';

const About: React.FC = () => {
  const { data, loading, error } = useAppData();
  const profile = data?.profile;
  const projects = data?.projects ?? [];
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to anchor if present in URL
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensure rendering
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Function to safely inject the iframe code provided by the user
  const renderInstagramEmbed = () => {
    const iframeCode = `<iframe class="instagram-media custom-instagram instagram-media-rendered" id="instagram-embed-0" src="https://www.instagram.com/p/CsCVJedJZ4u/embed/?cr=1&amp;v=14&amp;wp=398&amp;rd=https%3A%2F%2Falejandrosabater.com.ar&amp;rp=%2F%3Fsda%3D12#%7B%22ci%22%3A0%2C%22os%22%3A1418.699999988079%2C%22ls%22%3A876.6999999880791%2C%22le%22%3A1306.3999999761581%7D" allowtransparency="true" allowfullscreen="true" frameborder="0" height="606" data-instgrm-payload-id="instagram-media-payload-0" scrolling="no" style="background-color: white; border-radius: 8px; border: 1px solid rgb(219, 219, 219); box-shadow: none; display: block; margin: 0px; width: 100%; min-width: 300px; padding: 0px;"></iframe>`;
    
    return (
      <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-lg my-8" dangerouslySetInnerHTML={{ __html: iframeCode }} />
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section: Bio & Story */}
        <section id="bio" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start scroll-mt-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              <span className="bg-indigo-600 p-2 rounded-lg"><Code size={24} /></span>
              Sobre Mí
            </h2>
            {error && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm">
                {error}
              </div>
            )}
            <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed">
               <p>{profile.bioLong}</p>
            </div>
            
            {/* Tech Stack */}
            <div className="pt-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Layers size={20} className="text-indigo-400"/> My Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-slate-800 hover:bg-indigo-900 border border-slate-700 rounded-full text-sm font-medium text-indigo-300 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Proof / Instagram */}
          <div className="flex flex-col items-center justify-center bg-slate-800/50 rounded-2xl p-4 md:p-8 border border-slate-700">
            <h3 className="text-white text-lg font-semibold mb-4">Momentos Destacados</h3>
            {renderInstagramEmbed()}
          </div>
        </section>

        {/* Section: Projects Carousel */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Proyectos Recientes</h2>
            <div className="flex gap-2">
               <button onClick={() => scroll('left')} className="p-2 bg-slate-800 rounded-full border border-slate-700 text-white hover:bg-indigo-600 transition-colors shadow-lg">
                 <ChevronLeft className="w-5 h-5" />
               </button>
               <button onClick={() => scroll('right')} className="p-2 bg-slate-800 rounded-full border border-slate-700 text-white hover:bg-indigo-600 transition-colors shadow-lg">
                 <ChevronRight className="w-5 h-5" />
               </button>
            </div>
          </div>

          <div className="relative w-full group/carousel">
             {/* Left Fade/Button Overlay (Optional visual cue) */}
             <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none hidden md:block"></div>
             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none hidden md:block"></div>

             {/* Floating Navigation Buttons (On top of images) */}
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

            {/* Scroll Container */}
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar scroll-smooth"
            >
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="snap-center shrink-0 w-[85vw] sm:w-[400px] bg-slate-800 rounded-xl overflow-hidden border border-slate-700 group hover:border-indigo-500 transition-all duration-300 shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <a 
                        href={project.siteUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-white rounded-full text-white hover:bg-white hover:text-slate-900 transition-colors font-medium"
                      >
                        Visitar Web <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-slate-900 rounded text-indigo-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
