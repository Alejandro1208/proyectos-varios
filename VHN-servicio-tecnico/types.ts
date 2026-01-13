
export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  carouselImages: string[];
  category: 'Frio' | 'Caliente' | 'Hielo' | 'AA' | 'General';
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  aboutText: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  socials: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
}

export interface SiteData {
  company: CompanyInfo;
  services: Service[];
}
