import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { WorkWithUsSection } from './components/WorkWithUsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Banner */}
        <Hero onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

        {/* 2. Nosotros / Qué Hacemos (with animated 3 Sprinter minibuses arrival) */}
        <AboutSection />

        {/* 3. Servicios (Industrial Parks, Receptive Corporate Tourism, Group Travel) */}
        <ServicesSection onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

        {/* 4. Galería de Fotos (Imágenes reales de viajes) */}
        <GallerySection />

        {/* 5. Contacto (Direct Phone, Email, & WhatsApp Quote Calculator) */}
        <ContactSection />

        {/* 6. Trabaja con Nosotros (Driver Recruitment Flyer & CV contact) */}
        <WorkWithUsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Controls (WhatsApp) */}
      <FloatingWidgets />

      {/* Interactive Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
