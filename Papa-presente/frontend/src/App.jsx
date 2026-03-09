import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Consejos from './components/consejos/Consejos';
import Mapa from './components/mapa/Mapa';
import Habitos from './components/habitos/Habitos';
import Perfil from './components/perfil/Perfil';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/consejos" element={<Consejos />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/habitos" element={<Habitos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
