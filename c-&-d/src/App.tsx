import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import siteData from './data.json';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-blue-600 selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Header />
      
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp Button for Mobile */}
      <a
        href={`https://wa.me/${siteData.company.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-40 md:hidden bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 animate-bounce"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
