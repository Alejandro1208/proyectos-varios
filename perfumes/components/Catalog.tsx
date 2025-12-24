
import React, { useEffect, useState, useMemo } from 'react';
import { MessageCircle, Search } from 'lucide-react';
import { Category, Product } from '../types';

interface Props {
  phone: string;
  products: Product[];
}

const Catalog: React.FC<Props> = ({ phone, products }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('todos');
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const updatePerPage = () => {
      setPerPage(window.innerWidth < 768 ? 8 : 12);
    };
    updatePerPage();
    window.addEventListener('resize', updatePerPage);
    return () => window.removeEventListener('resize', updatePerPage);
  }, []);

  const sorted = useMemo(
    () => [...products].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const byCategory =
      activeCategory === 'todos'
        ? sorted
        : sorted.filter((p) => p.category === activeCategory);

    const term = searchTerm.trim().toLowerCase();
    if (!term) return byCategory;

    return byCategory.filter((p) => {
      const haystack = `${p.name} ${p.brand} ${p.description}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [activeCategory, searchTerm, sorted]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const paginated = filteredProducts.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, perPage, searchTerm]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleBuy = (product: Product) => {
    const message = encodeURIComponent(`Hola! Me interesa el perfume ${product.name}, ¿sigue disponible?`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section id="catalogo" className="py-24 bg-[#F2F2F2] scroll-mt-navbar">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-6">
          <h2 className="text-4xl font-bold tracking-tight text-[#0E0F26]">Nuestros Productos</h2>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full lg:w-auto">
            <div className="flex bg-[#0E0F26] p-1 rounded-full shadow-lg shadow-black/10">
              {(['todos', 'hombre', 'mujer', 'unisex'] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#BF926B] text-[#0D0D0D] shadow-md'
                      : 'text-[#F2F2F2] opacity-80 hover:opacity-100'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8C8C]" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar perfumes..."
                className="w-full bg-white border border-[#8C8C8C]/30 rounded-full py-3 pl-11 pr-4 text-sm text-[#0D0D0D] placeholder-[#8C8C8C] focus:outline-none focus:ring-2 focus:ring-[#BF926B]"
              />
            </div>
          </div>
        </div>

        {paginated.length === 0 ? (
          <div className="bg-white border border-[#8C8C8C]/20 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-lg font-semibold text-[#0E0F26]">No encontramos productos</p>
            <p className="text-sm text-[#8C8C8C] mt-2">Probá ajustando la búsqueda o cambiando la categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {paginated.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-square bg-[#0E0F26] rounded-2xl overflow-hidden mb-6 shadow-lg shadow-black/10">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8C8C8C] uppercase tracking-widest">Marca: {product.brand}</p>
                  <h3 className="text-lg font-bold text-[#0D0D0D]">{product.name}</h3>
                  <p className="text-sm text-[#8C8C8C] mt-1">{product.description}</p>
                  <p className={`text-sm font-semibold mt-2 ${product.stock > 0 ? 'text-[#BF926B]' : 'text-[#8C8C8C]'}`}>
                    {product.stock > 0 ? 'En stock' : 'Sin stock - Reservar'}
                  </p>
                  <p className="text-2xl font-bold text-[#0E0F26] mt-3">{formatPrice(product.price)}</p>
                </div>
                <button 
                  onClick={() => handleBuy(product)}
                  className={`mt-4 w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    product.stock > 0
                      ? 'bg-[#BF926B] text-[#0D0D0D] hover:brightness-105 shadow-md shadow-black/10'
                      : 'bg-[#8C8C8C] text-[#F2F2F2] hover:bg-[#0D0D0D]'
                  }`}
                >
                  <MessageCircle size={20} />
                  {product.stock > 0 ? 'Comprar' : 'Reservar'}
                </button>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg bg-[#0E0F26] text-[#F2F2F2] disabled:bg-[#8C8C8C] disabled:text-[#F2F2F2] disabled:opacity-70"
            >
              Anterior
            </button>
            <span className="text-sm text-[#0D0D0D]">Página {page} de {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg bg-[#0E0F26] text-[#F2F2F2] disabled:bg-[#8C8C8C] disabled:text-[#F2F2F2] disabled:opacity-70"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
