import React, { useEffect, useRef } from 'react';
import { Product } from '../types';
import { MessageCircle } from 'lucide-react';

interface Props {
  products: Product[];
  phone: string;
}

const FeaturedProducts: React.FC<Props> = ({ products, phone }) => {
  const featured = products.filter((p) => p.featured);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || featured.length === 0) return;
    const interval = setInterval(() => {
      const { scrollLeft, clientWidth, scrollWidth } = slider;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 5;
      const next = atEnd ? 0 : scrollLeft + clientWidth;
      slider.scrollTo({ left: next, behavior: 'smooth' });
    }, 4000);
    return () => clearInterval(interval);
  }, [featured.length]);

  const handleBuy = (product: Product) => {
    if (!phone) return;
    const message = encodeURIComponent(`Hola! Me interesa el perfume ${product.name}, ¿sigue disponible?`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  if (featured.length === 0) return null;

  return (
    <section className="py-16 bg-[#0E0F26]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#F2F2F2]">Productos destacados</h2>
          <div className="text-sm text-[#BF926B]">Desliza o deja que avance solo</div>
        </div>
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
        >
          {featured.map((p) => (
            <div key={p.id} className="min-w-[220px] max-w-[240px] snap-start bg-[#F2F2F2] rounded-2xl p-3 shadow-lg shadow-black/15">
              <div className="rounded-xl overflow-hidden mb-3 h-48">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-[11px] font-semibold text-[#8C8C8C] uppercase tracking-widest">Marca: {p.brand}</p>
              <h3 className="text-base font-bold text-[#0D0D0D] line-clamp-2">{p.name}</h3>
              <p className="text-sm text-[#8C8C8C] mt-1 line-clamp-2">{p.description}</p>
              <p className="text-lg font-bold text-[#0E0F26] mt-2">${p.price.toLocaleString()}</p>
              <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full ${p.stock > 0 ? 'bg-[#BF926B] text-[#0D0D0D]' : 'bg-[#8C8C8C] text-[#F2F2F2]'}`}>
                {p.stock > 0 ? `${p.stock} u.` : 'Sin stock'}
              </span>
              <button
                onClick={() => handleBuy(p)}
                className={`mt-3 w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  p.stock > 0
                    ? 'bg-[#BF926B] text-[#0D0D0D] hover:brightness-105 shadow-md shadow-black/10'
                    : 'bg-[#8C8C8C] text-[#F2F2F2] hover:bg-[#0D0D0D]'
                }`}
                disabled={!phone}
              >
                <MessageCircle size={18} />
                {p.stock > 0 ? 'Comprar' : 'Reservar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
