export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  siteUrl: string;
}

export interface SocialLink {
  id?: number;
  platform: string;
  url: string;
  icon: string;
}

export interface Video {
  id: string;
  title: string;
}

export interface ProfileData {
  name: string;
  role: string;
  location: string;
  bioShort: string;
  bioLong: string;
  avatarUrl: string;
  skills: string[];
  email: string;
}

export interface AppData {
  profile: ProfileData;
  projects: Project[];
  socials: SocialLink[];
  videos: Video[];
}
