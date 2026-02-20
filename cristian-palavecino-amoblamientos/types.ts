
export interface NavigationItem {
  label: string;
  id: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  title: string;
  category: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

// Added socials property to fix 'Property socials does not exist on type CompanyData' errors
export interface CompanyData {
  name: string;
  logo: string;
  tagline: string;
  whatsappUrl: string;
  navigation: NavigationItem[];
  about: {
    title: string;
    text: string;
    image: string;
  };
  banner: {
    title: string;
    subtitle: string;
    buttonText: string;
    image: string;
  };
  services: Service[];
  portfolio: Project[];
  testimonials: Testimonial[];
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  socials?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
}