
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import Login from './components/Login';
import FloatingWA from './components/FloatingWA';
import FloatingSocial from './components/FloatingSocial';
import { CONFIG, HERO_CONTENT, HOW_TO_BUY } from './constants';
import { Product, HeroContent, HowToBuy } from './types';
import HowToBuySection from './components/HowToBuySection';
import FeaturedProducts from './components/FeaturedProducts';
import { fetchProducts, fetchPhone, fetchHero, fetchHowToBuy } from './api-client';

export type View = 'home' | 'login' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [phone, setPhone] = useState<string>(CONFIG.phone);
  const [products, setProducts] = useState<Product[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [howToBuy, setHowToBuy] = useState<HowToBuy | null>(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [p, ph, hero, htb] = await Promise.all([
          fetchProducts(),
          fetchPhone(),
          fetchHero(),
          fetchHowToBuy()
        ]);
        setProducts(p);
        setPhone(ph || CONFIG.phone);
        setHeroContent(hero || HERO_CONTENT);
        setHowToBuy(htb || HOW_TO_BUY);
      } catch (err) {
        console.warn('Usando datos locales por error al cargar API', err);
        setHeroContent(HERO_CONTENT);
        setHowToBuy(HOW_TO_BUY);
      }
    };
    loadAll();
  }, []);

  const scrollToCatalog = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => setView('home');

  return (
    <main className="min-h-screen relative">
      {view === 'home' && (
        <>
          <Navbar onViewCatalog={scrollToCatalog} />
          {heroContent ? (
            <Hero onViewCatalog={scrollToCatalog} hero={heroContent} />
          ) : (
            <div className="h-[70vh] bg-[#0E0F26]" />
          )}
          {howToBuy && <HowToBuySection data={howToBuy} />}
          <FeaturedProducts products={products} phone={phone} />
          <Catalog phone={phone} products={products} />
          <Footer onAdminClick={() => setView('login')} phone={phone} />
        </>
      )}

      {view === 'login' && (
        <Login 
          onSuccess={() => setView('admin')} 
          onCancel={() => setView('home')} 
        />
      )}

      {view === 'admin' && (
        <AdminPanel 
          onLogout={handleLogout} 
          phone={phone} 
          onPhoneChange={setPhone}
          products={products}
          onProductsChange={setProducts}
          hero={heroContent}
          onHeroChange={setHeroContent}
          howToBuy={howToBuy}
          onHowToBuyChange={setHowToBuy}
        />
      )}

      {view === 'home' && (
        <>
          <FloatingWA phone={phone} />
          <FloatingSocial instagramUrl="https://www.instagram.com/growsestore/" tiktokUrl="https://www.tiktok.com/@growsestore" />
        </>
      )}
    </main>
  );
};

export default App;
