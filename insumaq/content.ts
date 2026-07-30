
import { SiteData } from './types';

export const siteData: SiteData = {
  "companyName": "INSUMAQ",
  "whatsappNumber": "5491131576788",
  "whatsappMessage": "Hola! Me gustaría obtener más información sobre sus servicios de reparación y repuestos.",
  "navItems": [
    { "label": "Inicio", "href": "#inicio" },
    { "label": "Nosotros", "href": "#nosotros" },
    { "label": "Servicios", "href": "#servicios" },
    { "label": "Repuestos", "href": "#repuestos" },
    { "label": "Contacto", "href": "#contacto" }
  ],
  "hero": {
    "title": "Soluciones Integrales en Maquinaria",
    "subtitle": "Especialistas en mantenimiento, venta de repuestos y fabricación de tamaños especiales, con demora máxima de 15 días hábiles.",
    "ctaText": "Ver Servicios",
    "backgroundImage": "/banner.jpg"
  },
  "about": {
    "title": "Liderazgo en el Sector de Maquinaria",
    "subtitle": "Sobre INSUMAQ",
    "description": "En INSUMAQ nos dedicamos a maximizar la vida útil de sus equipos pesados. Con una trayectoria consolidada, combinamos ingeniería de precisión con los mejores repuestos del mercado. Nuestro compromiso es la eficiencia operativa de su flota.",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
  },
  "services": [
    {
      "id": "hidraulica",
      "title": "Ingeniería Hidráulica",
      "description": "Reparación y mantenimiento de sistemas hidráulicos de alta presión con garantía de fábrica.",
      "icon": "fa-gears"
    },
    {
      "id": "electrica",
      "title": "Sistemas Eléctricos",
      "description": "Diagnóstico computarizado y reparación de módulos de control y sensores especializados.",
      "icon": "fa-bolt"
    },
    {
      "id": "motores",
      "title": "Overhaul de Motores",
      "description": "Reconstrucción total de motores diesel para equipos de minería, construcción y agro.",
      "icon": "fa-screwdriver-wrench"
    }
  ],
  "spareParts": {
    "title": "Repuestos Certificados",
    "description": "Nuestro fuerte es la atención de tamaños especiales y repuestos de difícil consecución. Aseguramos compatibilidad, durabilidad y una demora máxima de 15 días hábiles.",
    "deliveryInfo": "Demora máxima de 15 días hábiles.",
    "categories": [
      "Bombas y Motores Hidráulicos",
      "Kits de Filtros Originales",
      "Tren de Rodaje y Transmisión",
      "Elementos de Desgaste (Cuchillas/Puntas)"
    ],
    "image": "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=2070"
  },
  "contact": {
    "email": "Rep.insumaq@gmail.com",
    "phone": "+54 9 11 3157 6788",
    "address": "Caamaño 1103, Edificio Agora 1, Oficina 604, Pilar",
    "hours": "Lunes a Viernes de 08:00 a 18:00 hs"
  }
};
