import { Truck, Store, Box, Phone, Mail, MapPin, Menu, X, Instagram, Facebook, MessageCircle, ChevronRight } from 'lucide-react';

export const SERVICES = [
  {
    id: 'food-trucks',
    title: 'Food Trucks',
    description: 'Diseño y fabricación de unidades móviles gastronómicas totalmente equipadas y personalizadas para tu negocio.',
    icon: Truck,
    images: [
      '/images/food1.jpeg',
      '/images/food2.jpeg',
      '/images/food3.jpeg',
      '/images/food4.jpeg',
      '/images/food5.jpeg',
      '/images/food6.jpeg',
    ],
    specs: [
      "Chasis reforzado con perfil UPN 80mm",
      "Revestimiento interior en acero inoxidable 304",
      "Instalación eléctrica trifásica certificada",
      "Sistema de agua con bombas automáticas",
      "Aislación térmica de alta densidad en paredes y techo"
    ]
  },
  {
    id: 'exhibidores',
    title: 'Exhibidores Especiales',
    description: 'Proyectos de desarrollo y fabricación de exhibidores para eventos, locales comerciales y activaciones de marca.',
    icon: Store,
    images: [
      '/images/exi1.png',
      '/images/exi2.png',
      '/images/exi3.png',
      '/images/exi4.png',
      '/images/exi5.png',
      '/images/exi6.png',
    ],
    specs: [
      "Estructura modular desmontable de aluminio",
      "Iluminación LED RGB integrada y programable",
      "Materiales compuestos ligeros de alta resistencia",
      "Personalización con vinilo UV de larga duración",
      "Conectividad WiFi y puertos de carga USB integrados"
    ]
  },
  {
    id: 'cajas-termicas',
    title: 'Cajas Térmicas',
    description: 'Fabricación de cajas térmicas para carga refrigerada con los más altos estándares de aislamiento y durabilidad.',
    icon: Box,
    images: [
      '/images/cajas1.png',
    ],
    specs: [
      "Paneles de poliuretano inyectado de 100mm",
      "Coeficiente de transmisión térmica K < 0.4",
      "Piso acanalado para óptima circulación de aire",
      "Herrajes de acero inoxidable reforzados",
      "Burletes de goma de triple contacto para sellado hermético"
    ]
  }
];

export const NAV_LINKS = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Empresa', href: '#empresa' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Contacto', href: '#contacto' },
];
