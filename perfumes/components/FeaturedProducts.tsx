import React, { useEffect, useRef } from 'react';
import { Product } from '../types';
import { MessageCircle } from 'lucide-react';

interface Props {
  products: Product[];
  phone: string;
  discount: { value: string, prizeName: string } | null;
}

const FeaturedProducts: React.FC<Props> = ({ products, phone, discount }) => {
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

  const applyDiscount = (price: number) => {
    if (!discount) return price;
    if (discount.value === 'free_shipping') return price;
    const discountValue = parseInt(discount.value, 10);
    return price - (price * discountValue / 100);
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleBuy = (product: Product) => {
    if (!phone) return;
    let message = `Hola! Me interesa el perfume ${product.name}`;
    if(discount) {
      if (discount.value === 'free_shipping') {
        message += `, y gané un envío gratis!`;
      } else {
        message += `, y gané un ${discount.prizeName} de descuento!`;
      }
    }
    message += ' ¿Sigue disponible?';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
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
              {discount && discount.value !== 'free_shipping' && discount.value !== '0' ? (
                <div className='flex items-center gap-x-2'>
                    <p className="text-lg font-bold text-[#0E0F26] mt-2">{formatPrice(applyDiscount(p.price))}</p>
                    <p className="text-sm font-bold text-red-500 mt-2 line-through">{formatPrice(p.price)}</p>
                </div>
              ) : (
                <div className="mt-2">
                  <p className="text-lg font-bold text-[#0E0F26]">${p.price.toLocaleString()}</p>
                  {discount && discount.value === 'free_shipping' && (
                    <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-0.5 rounded inline-block">Envío gratis</span>
                  )}
                </div>
              )}
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
