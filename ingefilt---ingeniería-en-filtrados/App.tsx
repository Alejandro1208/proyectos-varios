import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductSection } from './components/ProductSection';
import { Applications } from './components/Applications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AiConsultant } from './components/AiConsultant';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ProductSection />
        <Applications />
        <Contact />
      </main>
      <Footer />
      <AiConsultant />
    </div>
  );
}

export default App;