export type ProjectCategory = 
  | 'Branding & Identity'
  | 'UI/UX & Product'
  | 'Advertising & Campaigns'
  | 'Visual Identity'
  | 'Branding & Identidad'
  | 'UI/UX & Producto'
  | 'Publicidad & Campañas'
  | 'Identidad Visual';

export type ProjectSegment = 
  | 'campaigns'      // Campañas
  | 'brand-books'    // Brand guidelines
  | 'logofolio';     // Logofolio / Identidad visual de logotipos

export interface SegmentInfo {
  id: ProjectSegment;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  rgb?: string;
  cmyk?: string;
  usage?: string;
}

export interface TypographySpec {
  name: string;
  role: string;
  preview: string;
  sample?: string;
}

export interface ProjectSection {
  title: string;
  subtitle?: string;
  content: string[];
  type?: 'text' | 'split' | 'grid' | 'quote' | 'stats' | 'media-pair' | 'brand-guidelines';
  stats?: { label: string; value: string; context?: string }[];
  highlight?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  category?: string;
  aspect?: '16:9' | '4:3' | '1:1' | '9:16' | '3:4';
  type: 'image' | 'screen' | 'mockup' | 'artwork' | 'poster';
  renderType?: 'svg' | 'dom' | 'interactive';
  customComponent?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: ProjectCategory;
  segment?: ProjectSegment;
  segmentLabel?: string;
  year: string;
  client?: string;
  role: string;
  isAcademicConcept?: boolean;
  shortDescription: string;
  fullOverview: string;
  fullDescription?: string;
  objective?: string;
  concept?: string;
  tagline: string;
  heroAccentColor: string;
  palette?: ColorSwatch[];
  colorPalette?: ColorSwatch[];
  typography?: TypographySpec[];
  sections: ProjectSection[];
  deliverables: string[];
  galleryItems?: GalleryItem[];
  featured: boolean;
  order: number;
  tags?: string[];
}

export type UpdateCategory = 
  | 'Scaler'
  | 'Branding'
  | 'Design'
  | 'Product'
  | 'Career'
  | 'Behind the Scenes'
  | 'Experiments'
  | string;

export interface Update {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: UpdateCategory;
  excerpt: string;
  summary?: string;
  content: string[] | string;
  relatedProjectSlug?: string;
  featured?: boolean;
  published: boolean;
  tags?: string[];
}

export interface ContactInquiry {
  name: string;
  email: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  createdAt: string;
}
