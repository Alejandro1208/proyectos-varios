import { AppData } from './types';

// This simulates the JSON that would eventually come from a database/PHP backend
export const INITIAL_DATA: AppData = {
  profile: {
    name: "Alejandro Sabater",
    role: "Frontend Web Developer",
    location: "José C. Paz, Buenos Aires",
    bioShort: "De José C. Paz al mundo digital. Creando experiencias web únicas.",
    bioLong: "Hola, soy Alejandro. Mi historia es una de perseverancia y transformación. Vengo de José C. Paz y mi camino no fue lineal; pasé de cartonero a convertirme en Desarrollador Web. Esta trayectoria me enseñó el valor del esfuerzo y la resolución de problemas. Hoy dedico mis días a escribir código limpio, eficiente y escalable, transformando ideas en realidades digitales.",
    avatarUrl: "https://picsum.photos/id/64/400/400", // Placeholder for user photo
    skills: ["React", "TypeScript", "Tailwind CSS", "PHP", "MySQL", "Git", "Node.js", "Figma"],
    email: "alejandroramonsabater@hotmail.com"
  },
  projects: [
    {
      id: 1,
      title: "E-Commerce Tech",
      description: "Tienda online completa con carrito y pasarela de pagos.",
      technologies: ["React", "Redux", "Stripe"],
      imageUrl: "https://picsum.photos/id/1/600/400",
      siteUrl: "#"
    },
    {
      id: 2,
      title: "Dashboard Admin",
      description: "Panel de administración para gestión de usuarios y métricas.",
      technologies: ["Vue.js", "Firebase", "Chart.js"],
      imageUrl: "https://picsum.photos/id/20/600/400",
      siteUrl: "#"
    },
    {
      id: 3,
      title: "Landing Page Inmobiliaria",
      description: "Sitio web de alto impacto para venta de propiedades.",
      technologies: ["HTML", "SASS", "JS Vanilla"],
      imageUrl: "https://picsum.photos/id/48/600/400",
      siteUrl: "#"
    },
    {
      id: 4,
      title: "App de Clima",
      description: "Aplicación de pronóstico del tiempo consumiendo API externa.",
      technologies: ["React", "Tailwind", "OpenWeatherAPI"],
      imageUrl: "https://picsum.photos/id/56/600/400",
      siteUrl: "#"
    },
    {
      id: 5,
      title: "Blog Personal",
      description: "Sistema de blog con CMS headless.",
      technologies: ["Next.js", "Sanity.io"],
      imageUrl: "https://picsum.photos/id/60/600/400",
      siteUrl: "#"
    }
  ],
  socials: [
    { id: 1, platform: "Instagram", url: "https://instagram.com", icon: "Instagram" },
    { id: 2, platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { id: 3, platform: "WhatsApp", url: "https://wa.me/123456789", icon: "MessageCircle" }
  ],
  videos: [
    { id: "dQw4w9WgXcQ", title: "Mi historia: De Cartonero a Dev" },
    { id: "M7lc1UVf-VE", title: "Tutorial: React desde cero" },
    { id: "tgbNymZ7vqY", title: "Consejos para Juniors" }
  ]
};
