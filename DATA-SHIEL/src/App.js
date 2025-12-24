import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './componentes/menu/Menu';
import Footer from './componentes/footer/Footer';
import Social from './componentes/social/SocialButtons';
import Home from './componentes/home/Home';
import Blog from './views/blog/Blog';
import BlogDetail from './views/blog/BlogDetail';
import LegalNotice from './views/legal/LegalNotice';
import TermsConditions from './views/legal/TermsConditions';
import PrivacyPolicy from './views/legal/PrivacyPolicy';
import Login from './views/login/Login';
import Admin from './views/admin/Admin';
import Contacto from './views/contacto/Contactenos';
import Paquetes from './views/paquetes/Paquetes';
import Servicios from './views/servicios/Servicios';

function App() {
    return (
        <div className="App">
            <Router>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/servicios" element={<Servicios />}></Route>
                    <Route path="/paquetes" element={<Paquetes />}></Route>
                    <Route path="/blog" element={<Blog />}></Route>
                    <Route path="/blog/:slug" element={<BlogDetail />}></Route>
                    <Route path="/aviso-legal" element={<LegalNotice />}></Route>
                    <Route path="/terminos-condiciones" element={<TermsConditions />}></Route>
                    <Route path="/politica-privacidad" element={<PrivacyPolicy />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/admin" element={<Admin />}></Route>
                    <Route path="/contacto" element={<Contacto />}></Route>
                </Routes>
                <Footer />
                <Social />
            </Router>
        </div>
    );
}

export default App;
