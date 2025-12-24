
export type Category = 'todos' | 'hombre' | 'mujer' | 'unisex';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  stock: number;
  featured?: boolean;
  sort_order?: number;
}

export interface Settings {
  phone: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  image: string;
}

export interface HowToBuy {
  title: string;
  description: string;
  videoUrl: string;
}

export interface Config {
  name: string;
  phone: string;
  instagram?: string;
  email?: string;
  address?: string;
}
