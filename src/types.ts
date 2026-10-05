export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accentColor: '#EFFF00' | '#304FFE';
  accentPosition: 'right';
  liveUrl?: string;
  fullDetails: {
    category: string;
    role: string;
    timeline: string;
    overview: string;
    challenge: string;
    solution: string;
    highlights: string[];
    metrics?: string[];
  };
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Strategy' | 'Design' | 'Execution' | 'Communication';
  description: string;
  coreTools: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  location?: string;
}

export interface SiteBranding {
  tabTitle: string;
  faviconUrl: string;
}
