
import { Product, Config } from './types';

export const CONFIG: Config = {
  name: "Growse Store",
  phone: "1162450386",
  instagram: "@growse_store",
  email: "ventas@growsestore.com",
  address: "Buenos Aires, Argentina"
};

export const HERO_CONTENT = {
  title: "Fragancias Premium.",
  subtitle: "Descubrí la mejor fijación y calidad del mercado con nuestras alternativas de alta gama.",
  image: "images/banner/banner.jpg"
};

export const HOW_TO_BUY = {
  title: "Cómo comprar nuestros perfumes",
  description: "Elegí tu perfume, consultá stock por WhatsApp y coordiná envío o retiro. Aceptamos pagos online y en efectivo.",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Odyssey Candee (Special Edition)",
    brand: "Armaf",
    price: 85000,
    category: "hombre",
    image: "images/products/perfume-1.jpeg",
    description: "Perfume dulce, para mujer, mejor repercusion en invierno, duracion de 8 horas aprox",
    stock: 8,
    featured: true,
    sort_order: 1
  },
  {
    id: 2,
    name: "Club de Nuit Woman",
    brand: "Armaf",
    price: 72000,
    category: "hombre",
    image: "images/products/perfume-2.jpeg",
    description: "Perfume de mujer, citrico, mejor para el verano o primavera, duracion aproximada de 6 horas",
    stock: 0,
    featured: false,
    sort_order: 2
  },
  {
    id: 3,
    name: "Odyssey Mandarin Sky",
    brand: "Armaf",
    price: 78000,
    category: "mujer",
    image: "images/products/perfume-3.jpeg",
    description: "Perfume unisex, mas hombre que mujer, citrico dulce para invierno con una duracion de mas de 6 horas",
    stock: 3,
    featured: true,
    sort_order: 3
  },
  {
    id: 4,
    name: "Lattafa Asad",
    brand: "Lattafa",
    price: 72000,
    category: "hombre",
    image: "images/products/perfume-2.jpeg",
    description: "Inspirado en Sauvage Elixir, especias y vainilla con gran fijación.",
    stock: 5,
    featured: false,
    sort_order: 4
  },
  {
    id: 5,
    name: "Club de Nuit Intense Man",
    brand: "Armaf",
    price: 85000,
    category: "hombre",
    image: "images/products/perfume-1.jpeg",
    description: "Notas de limón, abedul y jazmín. Potente y elegante.",
    stock: 10,
    featured: true,
    sort_order: 5
  },
  {
    id: 6,
    name: "La Nuit de L'Homme",
    brand: "Yves Saint Laurent",
    price: 110000,
    category: "hombre",
    image: "images/products/perfume-3.jpeg",
    description: "Cardamomo, cedro y bergamota para noches elegantes.",
    stock: 2,
    featured: false,
    sort_order: 6
  },
  {
    id: 7,
    name: "Good Girl",
    brand: "Carolina Herrera",
    price: 105000,
    category: "mujer",
    image: "images/products/perfume-2.jpeg",
    description: "Dulce y floral con cacao y haba tonka, ideal para salir.",
    stock: 4,
    featured: false,
    sort_order: 7
  },
  {
    id: 8,
    name: "Light Blue",
    brand: "Dolce & Gabbana",
    price: 95000,
    category: "mujer",
    image: "images/products/perfume-1.jpeg",
    description: "Cítrico fresco para verano, notas de limón y cedro.",
    stock: 7,
    featured: true,
    sort_order: 8
  },
  {
    id: 9,
    name: "Aventus",
    brand: "Creed",
    price: 180000,
    category: "hombre",
    image: "images/products/perfume-3.jpeg",
    description: "Piña, abedul y almizcle para un perfil sofisticado.",
    stock: 1,
    featured: true,
    sort_order: 9
  },
  {
    id: 10,
    name: "Ombre Nomade",
    brand: "Louis Vuitton",
    price: 210000,
    category: "unisex",
    image: "images/products/perfume-2.jpeg",
    description: "Oud ahumado con frambuesa, intenso y lujoso.",
    stock: 0,
    featured: false,
    sort_order: 10
  },
  {
    id: 11,
    name: "Bleu de Chanel",
    brand: "Chanel",
    price: 130000,
    category: "hombre",
    image: "images/products/perfume-1.jpeg",
    description: "Amaderado fresco con incienso y cítricos.",
    stock: 6,
    featured: true,
    sort_order: 11
  },
  {
    id: 12,
    name: "Libre",
    brand: "Yves Saint Laurent",
    price: 115000,
    category: "mujer",
    image: "images/products/perfume-3.jpeg",
    description: "Lavanda, vainilla y azahar con estela moderna.",
    stock: 9,
    featured: false,
    sort_order: 12
  },
  {
    id: 13,
    name: "Sauvage Elixir",
    brand: "Dior",
    price: 140000,
    category: "hombre",
    image: "images/products/perfume-2.jpeg",
    description: "Especiado y ambarado con proyección elevada.",
    stock: 3,
    featured: true,
    sort_order: 13
  },
  {
    id: 14,
    name: "Baccarat Rouge 540",
    brand: "MFK",
    price: 230000,
    category: "unisex",
    image: "images/products/perfume-1.jpeg",
    description: "Ámbar, jazmín y azafrán con dulce aireado.",
    stock: 0,
    featured: false,
    sort_order: 14
  },
  {
    id: 15,
    name: "Oud for Greatness",
    brand: "Initio",
    price: 200000,
    category: "unisex",
    image: "images/products/perfume-3.jpeg",
    description: "Oud especiado y azafrán con alta duración.",
    stock: 2,
    featured: true,
    sort_order: 15
  },
  {
    id: 16,
    name: "Flowerbomb",
    brand: "Viktor & Rolf",
    price: 99000,
    category: "mujer",
    image: "images/products/perfume-2.jpeg",
    description: "Bouquet floral dulce con pachulí y té.",
    stock: 5,
    featured: false,
    sort_order: 16
  }
];
