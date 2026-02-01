import React, { useEffect, useMemo, useState } from 'react';
import { Edit2, Trash2, Plus, LayoutDashboard, LogOut, X, RotateCw, Tag } from 'lucide-react';
import { CONFIG } from '../constants';
import { Product, HeroContent, HowToBuy, /* LuckyWheelData, */ PromoCode } from '../types';
import { fetchProducts, fetchHero, fetchHowToBuy, fetchPhone, createProduct, updateProduct, deleteProduct, reorderProducts, saveHero, saveHowToBuy, savePhone, fetchPromoCode, savePromoCode, /* fetchLuckyWheel, saveLuckyWheel */ } from '../api-client';
import { products as staticProducts, /* luckyWheel as staticLuckyWheel, */ promoCode as staticPromoCode } from '../data';

interface Props {
  onLogout: () => void;
  phone: string;
  onPhoneChange: (phone: string) => void;
  products: Product[];
  onProductsChange: (products: Product[]) => void;
  hero: HeroContent;
  onHeroChange: (hero: HeroContent) => void;
  howToBuy: HowToBuy;
  onHowToBuyChange: (how: HowToBuy) => void;
}

const AdminPanel: React.FC<Props> = ({ onLogout, phone, onPhoneChange, products, onProductsChange, hero, onHeroChange, howToBuy, onHowToBuyChange }) => {
  const [activeTab, setActiveTab] = useState<'productos' | 'banner' | 'como' | 'contacto' | 'rueda' | 'promo'>('productos');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{ id: number | null; name: string }>({ id: null, name: '' });
  const [phoneInput, setPhoneInput] = useState<string>(phone || CONFIG.phone);
  const [savingPhone, setSavingPhone] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [notice, setNotice] = useState<string>('');
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  // const [luckyWheelData, setLuckyWheelData] = useState<LuckyWheelData | null>(staticLuckyWheel);
  const [promoData, setPromoData] = useState<PromoCode>(staticPromoCode);

  const emptyForm: Product = useMemo(() => ({
    id: Date.now(),
    name: '',
    brand: '',
    price: 0,
    category: 'hombre',
    image: '',
    description: '',
    stock: 0,
    featured: false,
  }), []);

  const [formData, setFormData] = useState<Product>(emptyForm);

  useEffect(() => {
    setPhoneInput(phone || CONFIG.phone);
  }, [phone]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(''), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const resetForm = () => {
    setEditingId(null);
    setFormData({ ...emptyForm, id: Date.now() });
    setShowFormModal(false);
    setImageFile(null);
  };

  const refreshProducts = async () => {
    try {
      const prods = await fetchProducts();
      onProductsChange(prods);
    } catch (err) {
      console.error('No se pudieron recargar productos', err);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [h, c, ph, promo, prods /*, wheelData */] = await Promise.all([
          fetchHero(),
          fetchHowToBuy(),
          fetchPhone(),
          fetchPromoCode(),
          fetchProducts(),
          // fetchLuckyWheel(),
        ]);
        onProductsChange(prods || staticProducts);
        onHeroChange(h);
        onHowToBuyChange(c);
        onPhoneChange(ph || CONFIG.phone);
        setPhoneInput(ph || CONFIG.phone);
        // setLuckyWheelData(wheelData || staticLuckyWheel);
        setPromoData(promo || staticPromoCode);
      } catch (err) {
        console.error('No se pudieron cargar datos de admin', err);
      }
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData();
    body.append('name', formData.name);
    body.append('brand', formData.brand);
    body.append('price', String(formData.price));
    body.append('category', formData.category);
    body.append('description', formData.description);
    body.append('stock', String(formData.stock));
    if (formData.featured) body.append('featured', '1');
    if (typeof formData.sort_order === 'number') body.append('sort_order', String(formData.sort_order));

    if (imageFile) {
      body.append('image', imageFile);
    } else if (formData.image) {
      body.append('image', formData.image);
    }

    try {
      if (editingId) {
        await updateProduct(editingId, body);
        setNotice('Producto actualizado');
      } else {
        await createProduct(body);
        setNotice('Producto creado');
      }
      await refreshProducts();
      resetForm();
    } catch (err) {
      console.error('Error al guardar producto', err);
      setNotice('No se pudo guardar el producto');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setImageFile(null);
    setShowFormModal(true);
  };

  const handleDelete = () => {
    const { id } = showDeleteModal;
    if (!id) return;
    deleteProduct(id)
      .then(async () => {
        await refreshProducts();
        if (editingId === id) resetForm();
        setNotice('Producto eliminado');
      })
      .catch((err) => {
        console.error('Error al eliminar', err);
        setNotice('No se pudo eliminar');
      })
      .finally(() => setShowDeleteModal({ id: null, name: '' }));
  };

  const handleFile = (file?: File) => {
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFormData((prev) => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleHeroFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onHeroChange({ ...hero, image: result });
      setNotice('Imagen del banner actualizada');
    };
    reader.readAsDataURL(file);
    setHeroFile(file);
  };

  const handleSavePhone = async () => {
    setSavingPhone(true);
    try {
      await savePhone(phoneInput);
      onPhoneChange(phoneInput);
      setNotice('Teléfono guardado');
    } catch (err) {
      console.warn('No se pudo guardar el teléfono.', err);
      setNotice('No se pudo guardar el teléfono');
    } finally {
      setSavingPhone(false);
    }
  };

  const handleMove = (id: number, direction: 'up' | 'down') => {
    const sorted = [...products].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    const index = sorted.findIndex((p) => p.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;
    const temp = sorted[index].sort_order;
    sorted[index].sort_order = sorted[targetIndex].sort_order;
    sorted[targetIndex].sort_order = temp;
    const renumbered = sorted.map((p, idx) => ({ ...p, sort_order: idx + 1 }));
    onProductsChange(renumbered);
    reorderProducts(renumbered.map(p => p.id))
      .then(() => setNotice('Orden actualizado'))
      .catch(() => setNotice('No se pudo guardar el orden'));
  };

  const handleDrop = (targetId: number) => {
    if (!draggingId || draggingId === targetId) return;
    const sorted = [...products].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    const sourceIndex = sorted.findIndex((p) => p.id === draggingId);
    const targetIndex = sorted.findIndex((p) => p.id === targetId);
    if (sourceIndex === -1 || targetIndex === -1) return;
    const [moved] = sorted.splice(sourceIndex, 1);
    sorted.splice(targetIndex, 0, moved);
    const renumbered = sorted.map((p, idx) => ({ ...p, sort_order: idx + 1 }));
    onProductsChange(renumbered);
    setDraggingId(null);
    reorderProducts(renumbered.map(p => p.id))
      .then(() => setNotice('Orden actualizado'))
      .catch(() => setNotice('No se pudo guardar el orden'));
  };

  /*
  const handleSaveLuckyWheel = async () => {
    if (!luckyWheelData) return;
    try {
      // En el modo actual, esto guardará en lucky-wheel.json
      // En producción, guardará en la base de datos.
      await saveLuckyWheel(luckyWheelData);
      setNotice('Rueda de la fortuna guardada');
    } catch (err) {
      console.error('Error guardando la rueda', err);
      setNotice('No se pudo guardar la rueda');
    }
  };

  const handleLuckyWheelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    if (!luckyWheelData) return;
    const { name, value } = e.target;
    if (index !== undefined) {
      const newPrizes = [...luckyWheelData.prizes];
      newPrizes[index] = { ...newPrizes[index], [name]: value };
      setLuckyWheelData({ ...luckyWheelData, prizes: newPrizes });
    } else {
      setLuckyWheelData({
        ...luckyWheelData,
        settings: { ...luckyWheelData.settings, [name]: value },
      });
    }
  };

  const handleResetLuckyWheel = () => {
    localStorage.removeItem('lastSpin');
    localStorage.removeItem('luckyWheelState');
    setNotice('Datos de la rueda reiniciados en localStorage. Recargá la página principal para verla de nuevo.');
  };
  */

  const handleSavePromo = async () => {
    try {
      await savePromoCode(promoData);
      setNotice('Código promocional guardado');
    } catch (err) {
      console.error('Error guardando promo', err);
      setNotice('No se pudo guardar el código promocional');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 py-4 px-8 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <span className="font-bold tracking-tight text-lg">Admin Nacho Perfumes</span>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-semibold"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Contenido</h1>
            <p className="text-slate-500">Administrá tu tienda en tiempo real.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'productos', label: 'Productos' },
              { key: 'banner', label: 'Banner' },
              { key: 'como', label: 'Cómo comprar' },
              { key: 'contacto', label: 'Contacto' },
              // { key: 'rueda', label: 'Rueda de la Fortuna' },
              { key: 'promo', label: 'Código Promo' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  activeTab === tab.key ? 'bg-black text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {notice && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-green-50 text-green-700 font-semibold border border-green-100">
            {notice}
          </div>
        )}

        {activeTab === 'productos' && (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ ...emptyForm, id: Date.now() });
                  setShowFormModal(true);
                }}
                className="bg-black text-white px-4 py-2 rounded-lg font-bold text-sm md:text-base flex items-center gap-2 hover:bg-slate-800 transition-all"
              >
                <Plus size={18} />
                Nuevo producto
              </button>
            </div>

            {/* Desktop table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[780px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                      <th className="px-6 py-4">Producto</th>
                      <th className="px-6 py-4">Categoría</th>
                      <th className="px-6 py-4">Destacado</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Precio</th>
                      <th className="px-6 py-4">Orden</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[...products].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-slate-50 transition-colors group"
                        draggable
                        onDragStart={() => setDraggingId(p.id)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(p.id)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img src={p.image} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                            <div>
                              <div className="font-bold text-slate-900">{p.name}</div>
                              <div className="text-xs text-slate-500">Marca: {p.brand}</div>
                              <div className="text-xs text-slate-500 max-w-xs line-clamp-2">{p.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600 uppercase">
                            {p.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {p.featured ? (
                            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Sí</span>
                          ) : (
                            <span className="text-xs font-semibold text-slate-500">No</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                            {p.stock > 0 ? 'En stock' : 'Sin stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">
                          ${p.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {p.sort_order ?? 0}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 md:gap-3 flex-wrap">
                            <button
                              onClick={() => handleEdit(p)}
                              className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                              title="Editar"
                            >
                              <div className="flex items-center gap-1">
                                <Edit2 size={16} />
                                <span className="hidden sm:inline">Editar</span>
                              </div>
                            </button>
                            <button
                              onClick={() => setShowDeleteModal({ id: p.id, name: p.name })}
                              className="px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                              title="Eliminar"
                            >
                              <div className="flex items-center gap-1">
                                <Trash2 size={16} />
                                <span className="hidden sm:inline">Eliminar</span>
                              </div>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {[...products].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"
                  draggable
                  onDragStart={() => setDraggingId(p.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(p.id)}
                >
                  <div className="flex gap-3">
                    <img src={p.image} className="w-16 h-16 rounded-lg object-cover shadow-sm" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Marca: {p.brand}</p>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">{p.name}</h3>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-3">{p.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600 uppercase">
                      {p.category}
                    </span>
                    {p.featured && (
                      <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Destacado</span>
                    )}
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      {p.stock > 0 ? 'En stock' : 'Sin stock'}
                    </span>
                    <span className="text-lg font-bold text-slate-900 ml-auto">${p.price.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="flex-1 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit2 size={16} />
                      Editar
                    </button>
                    <button
                      onClick={() => setShowDeleteModal({ id: p.id, name: p.name })}
                      className="flex-1 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'banner' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Título del banner</p>
              <input
                value={hero.title}
                onChange={(e) => onHeroChange({ ...hero, title: e.target.value })}
                className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Texto del banner</p>
              <input
                value={hero.subtitle}
                onChange={(e) => onHeroChange({ ...hero, subtitle: e.target.value })}
                className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <div className="mt-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Subir imagen (reemplaza la actual)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleHeroFile(e.target.files?.[0])}
                  className="mt-1 w-full"
                />
                {hero.image && (
                  <div className="mt-2 rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
                    <img src={hero.image} alt="Preview banner" className="w-full h-40 object-cover" />
                  </div>
                )}
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  onClick={async () => {
                    try {
                      await saveHero(hero, heroFile || undefined);
                      const updated = await fetchHero();
                      onHeroChange(updated);
                      setHeroFile(null);
                      setNotice('Banner guardado');
                    } catch (err) {
                      console.error('Error guardando banner', err);
                      setNotice('No se pudo guardar el banner');
                    }
                  }}
                  className="px-5 py-3 rounded-lg font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all"
                >
                  Guardar banner
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'como' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 grid gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Título sección “Cómo comprar”</p>
              <input
                value={howToBuy.title}
                onChange={(e) => onHowToBuyChange({ ...howToBuy, title: e.target.value })}
                className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Descripción</p>
              <textarea
                value={howToBuy.description}
                onChange={(e) => onHowToBuyChange({ ...howToBuy, description: e.target.value })}
                className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Video (URL YouTube)</p>
              <input
                value={howToBuy.videoUrl}
                onChange={(e) => onHowToBuyChange({ ...howToBuy, videoUrl: e.target.value })}
                className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={async () => {
                  try {
                    await saveHowToBuy(howToBuy);
                    const updated = await fetchHowToBuy();
                    onHowToBuyChange(updated);
                    setNotice('Sección guardada');
                  } catch (err) {
                    console.error('Error guardando sección Cómo comprar', err);
                    setNotice('No se pudo guardar la sección');
                  }
                }}
                className="px-5 py-3 rounded-lg font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all"
              >
                Guardar sección
              </button>
            </div>
          </div>
        )}

        {activeTab === 'contacto' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Teléfono de WhatsApp</p>
                <input
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  placeholder="1162450386"
                />
                <p className="text-slate-500 text-sm mt-1">Se usa en todos los botones de WhatsApp.</p>
              </div>
              <button
                onClick={handleSavePhone}
                disabled={savingPhone}
                className="px-5 py-3 rounded-lg font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all disabled:opacity-60 self-start md:self-center whitespace-nowrap"
              >
                {savingPhone ? 'Guardando...' : 'Guardar teléfono'}
              </button>
            </div>
          </div>
        )}

        {/* 
        {activeTab === 'rueda' && luckyWheelData && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 grid gap-4">
            <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Tiros por usuario</p>
                <input
                    type="number"
                    name="spins_per_user"
                    value={luckyWheelData.settings.spins_per_user}
                    onChange={handleLuckyWheelChange}
                    className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
            </div>
            <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Duración de la promoción (horas)</p>
                <input
                    type="number"
                    name="duration_hours"
                    value={luckyWheelData.settings.duration_hours}
                    onChange={handleLuckyWheelChange}
                    className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
            </div>
            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="wheelActive"
                name="is_active"
                checked={luckyWheelData.settings.is_active === '1'}
                onChange={(e) => handleLuckyWheelChange({ target: { name: 'is_active', value: e.target.checked ? '1' : '0' } } as any)}
                className="w-5 h-5 accent-black"
              />
              <label htmlFor="wheelActive" className="font-medium text-slate-700 cursor-pointer">Activar Rueda de la Fortuna</label>
            </div>
            <hr className="my-4" />
            <h3 className="text-lg font-bold">Premios</h3>
            {luckyWheelData.prizes.map((prize, index) => (
                <div key={prize.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 border-b pb-4">
                    <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Nombre del Premio</p>
                        <input name="name" value={prize.name} onChange={(e) => handleLuckyWheelChange(e, index)} className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none" placeholder="Nombre del premio" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Valor</p>
                        <input name="value" value={prize.value} onChange={(e) => handleLuckyWheelChange(e, index)} className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none" placeholder="Valor (ej: 10 o free_shipping)" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Probabilidad (%)</p>
                        <input type="number" step="0.01" name="chance" value={prize.chance} onChange={(e) => handleLuckyWheelChange(e, index)} className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none" placeholder="Probabilidad (%)" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Color de Fondo</p>
                        <input type="color" name="background_color" value={prize.background_color} onChange={(e) => handleLuckyWheelChange(e, index)} className="w-full h-12 p-1 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Color de Texto</p>
                        <input type="color" name="text_color" value={prize.text_color} onChange={(e) => handleLuckyWheelChange(e, index)} className="w-full h-12 p-1 rounded-xl" />
                    </div>
                </div>
            ))}
             <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleResetLuckyWheel}
                className="px-5 py-3 rounded-lg font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all text-sm"
              >
                Reiniciar Rueda (para pruebas)
              </button>
              <button
                onClick={handleSaveLuckyWheel}
                className="px-5 py-3 rounded-lg font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all"
              >
                Guardar Rueda de la Fortuna
              </button>
            </div>
          </div>
        )}
        */}

        {activeTab === 'promo' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Código del cupón</p>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  value={promoData.code}
                  onChange={(e) => setPromoData({ ...promoData, code: e.target.value.toUpperCase() })}
                  className="w-full bg-slate-100 border-none p-3 pl-10 rounded-xl focus:ring-2 focus:ring-black outline-none uppercase font-bold"
                  placeholder="EJ: VERANO2026"
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Porcentaje de descuento (%)</p>
              <input
                type="number"
                value={promoData.discount_percentage}
                onChange={(e) => setPromoData({ ...promoData, discount_percentage: Number(e.target.value) })}
                className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="promoActive"
                checked={promoData.is_active}
                onChange={(e) => setPromoData({ ...promoData, is_active: e.target.checked })}
                className="w-5 h-5 accent-black"
              />
              <label htmlFor="promoActive" className="font-medium text-slate-700 cursor-pointer">Activar código promocional</label>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button onClick={handleSavePromo} className="px-5 py-3 rounded-lg font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all">Guardar Configuración</button>
            </div>
          </div>
        )}

        {showFormModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={resetForm}
                className="absolute right-4 top-4 text-slate-400 hover:text-black"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
              <h2 className="text-2xl font-bold mb-1">{editingId ? 'Editar producto' : 'Nuevo producto'}</h2>
              <p className="text-slate-500 mb-6">Completá los datos y subí la imagen del producto.</p>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nombre</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    placeholder="Nombre del perfume"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Marca</label>
                  <input
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    placeholder="Armaf"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Precio (ARS)</label>
                  <input
                    required
                    type="number"
                    min={0}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    placeholder="85000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as Product['category'] })
                    }
                    className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  >
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="unisex">Unisex</option>
                    <option value="de diseñador">De diseñador</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Stock</label>
                  <input
                    required
                    type="number"
                    min={0}
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Imagen</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                    className="w-full"
                  />
                  {formData.image && (
                    <div className="mt-2 rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
                      <img src={formData.image} alt="Preview" className="w-full h-40 object-cover" />
                    </div>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Descripción</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-100 border-none p-3 rounded-xl focus:ring-2 focus:ring-black outline-none min-h-[100px]"
                    placeholder="Notas, fijación, temporada, etc."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Destacado</label>
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={!!formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    Incluir en productos destacados
                  </label>
                </div>
                <div className="flex gap-3 md:col-span-2 justify-end">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 rounded-xl font-bold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    {editingId ? 'Guardar cambios' : 'Agregar producto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal.id && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h3 className="text-xl font-bold mb-2">Eliminar producto</h3>
              <p className="text-slate-600 mb-6">
                ¿Seguro que querés eliminar <span className="font-semibold">{showDeleteModal.name}</span>?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal({ id: null, name: '' })}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;