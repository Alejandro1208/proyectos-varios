
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
import { Product, HeroContent, HowToBuy, Prize, PromoCode } from './types';
import HowToBuySection from './components/HowToBuySection';
import FeaturedProducts from './components/FeaturedProducts';
import { fetchPhone, fetchHero, fetchHowToBuy, fetchPromoCode, fetchProducts } from './api-client';
// import LuckyWheel from './components/LuckyWheel';
import PromoCodeModal from './components/PromoCodeModal';
import { products as staticProducts, /* luckyWheel as staticWheelData, */ promoCode as staticPromoCode } from './data';

export type View = 'home' | 'login' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [phone, setPhone] = useState<string>(CONFIG.phone);
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [heroContent, setHeroContent] = useState<HeroContent>(HERO_CONTENT);
  const [howToBuy, setHowToBuy] = useState<HowToBuy>(HOW_TO_BUY);
  const [discount, setDiscount] = useState<{ value: string, prizeName: string } | null>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoCodeSettings, setPromoCodeSettings] = useState<PromoCode>(staticPromoCode);
  const [offerExpiresAt, setOfferExpiresAt] = useState<number | null>(null);
  const [categorySettings, setCategorySettings] = useState<Record<string, boolean>>({});

  /*
  useEffect(() => {
    const spinStateStr = localStorage.getItem('luckyWheelState');
    if (spinStateStr) {
      const spinState = JSON.parse(spinStateStr);
      const offerDuration = 2 * 60 * 60 * 1000; // La oferta dura 2 horas fijas
      const lastSpinDate = new Date(spinState.timestamp);
      const expires = lastSpinDate.getTime() + offerDuration;
      const now = new Date();

      if (now.getTime() < expires) {
        if (spinState.prize) {
          setDiscount({ value: spinState.prize.value, prizeName: spinState.prize.name });
          if (spinState.prize.value !== '0') {
            setOfferExpiresAt(expires);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!offerExpiresAt) return;
    const interval = setInterval(() => {
      if (Date.now() > offerExpiresAt) {
        setDiscount(null);
        setOfferExpiresAt(null);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [offerExpiresAt]);
  */

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [ph, hero, htb, promo, prods] = await Promise.all([
          fetchPhone(),
          fetchHero(),
          fetchHowToBuy(),
          fetchPromoCode(),
          fetchProducts()
        ]);
        setPhone(ph || CONFIG.phone);
        setHeroContent(hero || HERO_CONTENT);
        setHowToBuy(htb || HOW_TO_BUY);
        setPromoCodeSettings(promo || staticPromoCode);
        setProducts(prods || staticProducts);

        // Cargar settings de categorías
        try {
          const res = await fetch('/api/settings.php');
          if (res.ok) {
            const data = await res.json();
            setCategorySettings({
              paused_hombre: data.paused_hombre === '1',
              paused_mujer: data.paused_mujer === '1',
              paused_unisex: data.paused_unisex === '1',
              paused_de_diseñador: data.paused_de_diseñador === '1',
            });
          }
        } catch (e) { console.warn("Error cargando settings de categorías", e); }
      } catch (err) {
        console.warn('Usando datos locales por error al cargar API', err);
        setHeroContent(HERO_CONTENT);
        setHowToBuy(HOW_TO_BUY);
        setPromoCodeSettings(staticPromoCode);
      }
    };
    loadAll();
  }, []);

  /*
  const handlePrizeClaimed = (prize: Prize) => {
    setDiscount({ value: prize.value, prizeName: prize.name });
    if (prize.value !== '0') {
      const spinStateStr = localStorage.getItem('luckyWheelState');
      if (spinStateStr) {
        const spinState = JSON.parse(spinStateStr);
        setOfferExpiresAt(spinState.timestamp + 2 * 60 * 60 * 1000);
      }
    }
  };
  */

  const handleApplyPromoCode = (code: string) => {
    if (promoCodeSettings && promoCodeSettings.code === code) {
      setDiscount({ value: String(promoCodeSettings.discount_percentage), prizeName: `Cupón ${code}` });
      // Opcional: Guardar en localStorage si quieres que persista como la rueda
    }
  };

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
      {/* {view === 'home' && <LuckyWheel onPrizeClaimed={handlePrizeClaimed} />} */}
      {view === 'home' && (
        <>
          <Navbar onViewCatalog={scrollToCatalog} onOpenPromo={() => setShowPromoModal(true)} offerExpiresAt={offerExpiresAt} />
          {heroContent ? (
            <Hero onViewCatalog={scrollToCatalog} hero={heroContent} />
          ) : (
            <div className="h-[70vh] bg-[#0E0F26]" />
          )}
          {howToBuy && <HowToBuySection data={howToBuy} />}
          <FeaturedProducts products={products} phone={phone} discount={discount} />
          <Catalog phone={phone} products={products} discount={discount} categorySettings={categorySettings} />
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
          <FloatingWA phone={phone} discount={discount} />
          <FloatingSocial instagramUrl="https://www.instagram.com/growsestore/" tiktokUrl="https://www.tiktok.com/@growsestore" />
        </>
      )}

      {showPromoModal && (
        <PromoCodeModal 
          onClose={() => setShowPromoModal(false)} 
          onApply={handleApplyPromoCode}
          validPromoCode={promoCodeSettings}
        />
      )}
    </main>
  );
};

export default App;
