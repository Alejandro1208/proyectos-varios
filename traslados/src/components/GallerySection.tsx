import React, { useState } from 'react';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { withBasePath } from '../utils/assetPath';

interface GalleryItem {
  id: string;
  image: string;
  alt: string;
}

const galleryData: GalleryItem[] = Array.from({ length: 16 }, (_, i) => ({
  id: `${i + 1}`,
  image: withBasePath(`/img/galeria-${i + 1}.jpeg`),
  alt: `Galería de Foto ${i + 1}`
}));

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleOpenLightbox = (item: GalleryItem, index: number) => {
    setSelectedImage(item);
    setSelectedIndex(index);
  };

  const handlePrev = () => {
    const prevIdx = (selectedIndex - 1 + galleryData.length) % galleryData.length;
    setSelectedIndex(prevIdx);
    setSelectedImage(galleryData[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % galleryData.length;
    setSelectedIndex(nextIdx);
    setSelectedImage(galleryData[nextIdx]);
  };

  return (
    <section id="galeria" className="py-20 bg-slate-900 text-white relative border-t border-slate-800">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-300 text-sm font-bold uppercase tracking-wider mb-2">
            <Camera className="w-4 h-4 text-blue-400" />
            <span>Galería de Fotos</span>
          </div>
        </div>

        {/* Pure Photo Grid (No cards, no text) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {galleryData.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item, index)}
              className="group relative h-48 sm:h-64 lg:h-72 w-full rounded-2xl overflow-hidden cursor-pointer bg-slate-950 border border-slate-800/80 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Subtle hover overlay with zoom icon */}
              <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 rounded-full bg-blue-600/90 text-white shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal (Pure image preview without cards or text) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 shadow-xl z-50 transition-colors"
            aria-label="Cerrar imagen"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-blue-600 border border-slate-700 z-50 transition-colors hidden sm:flex items-center justify-center"
            aria-label="Anterior imagen"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-blue-600 border border-slate-700 z-50 transition-colors hidden sm:flex items-center justify-center"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Pure Image Frame */}
          <div 
            className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl flex items-center justify-center border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.alt}
              className="max-h-[85vh] w-auto object-contain rounded-2xl"
            />
          </div>

        </div>
      )}

    </section>
  );
};

