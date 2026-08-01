export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  heroDescription: string;
  aboutText: string;
  phone: string;
  formattedPhone: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  email: string;
  recruitmentEmail: string;
  address: string;
  operatingHours: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'corporativo' | 'receptivo' | 'recreativo';
  description: string;
  features: string[];
  image: string;
  badgeText: string;
  whatsappMessage: string;
}

export interface FleetVehicle {
  model: string;
  brand: string;
  quantity: number;
  capacity: string;
  features: string[];
  image: string;
  description: string;
}

export interface DriverRequirement {
  icon: string;
  title: string;
  description: string;
}

export interface CompanyData {
  company: CompanyInfo;
  services: ServiceItem[];
  fleet: FleetVehicle;
  driverRequirements: DriverRequirement[];
  aboutFeatures: {
    title: string;
    description: string;
    icon: string;
  }[];
}
