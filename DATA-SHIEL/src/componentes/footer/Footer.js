import React from 'react';
import './Footer.css'; 
import Logo from './img/logo.png';
import { Link } from 'react-router-dom';

function Footer() {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    return (
        <footer>
            <div className="footer-content">
                <div className="logo">
                    <a href="#" onClick={scrollTop}><img src={Logo} width={100}></img></a>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/" onClick={scrollTop}>Home</Link></li>
                        <li><Link to="/servicios" onClick={scrollTop}>Servicios</Link></li>
                        {/* <li><Link to="/paquetes">Paquetes</Link></li> */}
                        <li><Link to="/blog" onClick={scrollTop}>Blog</Link></li>
                        <li><Link to="/contacto" onClick={scrollTop}>Contáctenos</Link></li>
                        <li><Link to="/politica-privacidad" onClick={scrollTop}>Política de Privacidad</Link></li>
                    </ul>
                </nav>
                <div className="legal">
                    <Link to="/aviso-legal" onClick={scrollTop}>Términos Legales</Link>
                    <Link to="/terminos-condiciones" onClick={scrollTop}>Politica de Cookies</Link>
                    <Link to="/politica-privacidad" onClick={scrollTop}>Política de Privacidad</Link>
                </div>
                <div className="copyright">
                    &copy; 2024 DATASHIELD
                </div>
            </div>
        </footer>
    );
}

export default Footer;
