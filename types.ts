
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  urduTitle: string;
  image?: string;
}

export interface NavChild {
  label: string;
  href: string;
  description: string;
  benefits: string[];
  urduDescription?: string;
}

export interface NavItem {
  label: string;
  href: string;
  urduLabel: string;
  summary?: string;
  cta?: string;
  children?: NavChild[];
}
