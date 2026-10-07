export type ThemeId =
  | "earth-graphite"
  | "forest-cream"
  | "terracotta-ivory"
  | "dark-lime"
  | "lavender-charcoal";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  colors: {
    bg: string;
    surface: string;
    surfaceHover: string;
    border: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryHover: string;
    secondary: string;
    accent: string;
    highlight: string;
    glow: string;
  };
}

export type ProjectCategory =
  | "All"
  | "Full Stack"
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "Cloud";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  domain: string;
  category: ProjectCategory[];
  featured: boolean;
  problem: string;
  solution: string;
  architecture: string;
  keyFeatures: string[];
  technologies: string[];
  metrics: string[];
  links: {
    github?: string;
    live?: string;
    playStore?: string;
    appStore?: string;
    npm?: string;
  };
  highlightColor?: string;
  badge?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  type: string;
  domain: string;
  isCurrent?: boolean;
  isPromotion?: boolean;
  promotedFrom?: string;
  responsibilities: string[];
  technologies: string[];
  impactMetrics: { label: string; value: string }[];
}

export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Cloud"
  | "DevOps"
  | "Architecture"
  | "Testing & Tools";

export interface TechItem {
  name: string;
  category: TechCategory;
  level: "Core" | "Advanced" | "Production-Ready";
  iconName: string;
  experience: string;
  description: string;
  productionUse: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  deliverables: string[];
  icon: string;
  stack: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  category: "Client" | "Edge" | "Routing" | "Application" | "Cache" | "Database" | "Async" | "DevOps";
  protocol: string;
  role: string;
  description: string;
  latencyBenchmark: string;
  resilienceStrategy: string;
  abinashNotes: string;
  connections: string[];
}
