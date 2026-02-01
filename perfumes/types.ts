
export type Category = 'todos' | 'hombre' | 'mujer' | 'unisex' | 'de diseñador';

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

export interface Prize {
  id: number;
  name: string;
  value: string;
  chance: number;
  background_color: string;
  text_color: string;
}

export interface LuckyWheelData {
  settings: {
    spins_per_user: string;
    duration_hours: string;
    is_active: string;
  };
  prizes: Prize[];
}

export interface PromoCode {
  code: string;
  discount_percentage: number;
  is_active: boolean;
}
