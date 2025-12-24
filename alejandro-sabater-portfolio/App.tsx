import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      
      <footer className="bg-slate-950 py-8 text-center text-slate-500 text-sm border-t border-slate-900">
        <p>© {new Date().getFullYear()} Alejandro Sabater. Todos los derechos reservados.</p>
        <p className="mt-2 text-xs">Hecho con React, TypeScript & Tailwind</p>
      </footer>
    </div>
  );
};

export default App;