import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { siteSettings } = useData();

  // --- 1. Lógica para determinar si el color de fondo es oscuro ---
  const headerTextColor = useMemo(() => {
    const hexColor = siteSettings.color_header_bg;
    if (!hexColor || hexColor.length < 7) return 'text-base-content'; // Color de texto por defecto (oscuro)

    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

    // Si la luminosidad es baja (color oscuro), devuelve la clase para texto blanco.
    return luminance < 140 ? 'text-white' : 'text-base-content';
  }, [siteSettings.color_header_bg]);

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/menu' },
  ];

  return (
    // --- 2. Aplicamos el color de fondo dinámicamente ---
    <header 
      className="shadow-md sticky top-0 z-50"
      style={{ backgroundColor: siteSettings.color_header_bg || 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={siteSettings.site_logo_url || ''} alt="Logo" className="h-20 w-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex flex-grow justify-center">
            <div className="flex items-center space-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  // --- 3. Aplicamos el color de texto dinámico a los links ---
                  className={`text-lg font-semibold tracking-wide transition-colors duration-300 relative group pb-1 ${
                    location.pathname === item.href
                      ? 'text-primary' // El link activo mantiene el color primario
                      : `${headerTextColor} hover:text-primary`
                  }`}
                >
                  <span>{item.name}</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-center ${
                    location.pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              ))}
            </div>
          </nav>

          <div className={`hidden md:flex items-center space-x-6 text-sm ${headerTextColor}`}>
             <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-accent" />
              <span className="font-medium">{siteSettings.contact_phone}</span>
            </div>
             <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-accent" />
              <span className="font-medium">{siteSettings.address}</span>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={headerTextColor}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t py-4" style={{ backgroundColor: siteSettings.color_header_bg || 'white' }}>
          <div className="px-4 flex flex-col items-center space-y-4">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium hover:text-primary ${headerTextColor}`}>
                {item.name}
              </Link>
            ))}
            <div className={`pt-4 border-t w-full text-center space-y-2 ${headerTextColor}`}>
                <div className="flex items-center justify-center"><Phone className="h-4 w-4 mr-2 text-primary"/>{siteSettings.contact_phone}</div>
                <div className="flex items-center justify-center"><MapPin className="h-4 w-4 mr-2 text-primary"/>{siteSettings.address}</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;