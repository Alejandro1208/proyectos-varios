import React, { useState, useRef, useEffect } from 'react';
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from './img/logo.png';
import { Link } from 'react-router-dom';

function Menu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header>
            <nav>
                <div className="menu-icon" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                </div>
                <div className="logo">
                    <Link to="/" onClick={closeMenu}><img src={Logo} width={300} alt="Logo"></img></Link>
                </div>
                <div className={`menu ${menuOpen ? 'active' : ''}`} ref={menuRef}>
                    <ul>
                        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                        <li><Link to="/servicios" onClick={closeMenu}>Servicios</Link></li>
                        {/* <li><Link to="/paquetes" onClick={closeMenu}>Paquetes</Link></li> */}
                        <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
                        <li><Link to="/contacto" onClick={closeMenu}>Contáctenos</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Menu;
