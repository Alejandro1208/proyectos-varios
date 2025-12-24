import React from 'react';
import { HowToBuy } from '../types';

interface Props {
  data: HowToBuy;
}

const HowToBuySection: React.FC<Props> = ({ data }) => {
  const embedUrl = (() => {
    try {
      const parsed = new URL(data.videoUrl);
      const host = parsed.hostname.replace(/^www\./, '');

      if (host === 'youtu.be') {
        const id = parsed.pathname.replace('/', '');
        return id ? `https://www.youtube.com/embed/${id}` : data.videoUrl;
      }

      if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
        if (parsed.pathname.startsWith('/embed/')) {
          return `https://www.youtube.com${parsed.pathname}`;
        }

        if (parsed.pathname === '/watch') {
          const id = parsed.searchParams.get('v');
          return id ? `https://www.youtube.com/embed/${id}` : data.videoUrl;
        }
      }

      return data.videoUrl;
    } catch {
      return data.videoUrl;
    }
  })();

  return (
    <section className="py-16 bg-[#F2F2F2]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0E0F26] mb-4">{data.title}</h2>
          <p className="text-[#8C8C8C] text-lg mb-8">{data.description}</p>
          <div className="relative pb-[177%] md:pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-xl bg-[#0D0D0D]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedUrl}
              title="Cómo comprar"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToBuySection;
