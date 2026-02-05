
export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SectionContent {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

export interface SiteData {
  companyName: string;
  whatsappNumber: string;
  whatsappMessage: string;
  navItems: NavItem[];
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  about: SectionContent;
  services: Service[];
  spareParts: {
    title: string;
    description: string;
    categories: string[];
    image: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
}
