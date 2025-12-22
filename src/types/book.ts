export interface MarketplaceLink {
  marketplace: 'amazon' | 'amazon-uk' | 'amazon-de' | 'etsy' | 'bookdepository' | 'other';
  label: string;
  url: string;
  region?: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImage: string;
  ageRange: string;
  pageCount: number;
  features: string[];
  marketplaceLinks: MarketplaceLink[];
  badge?: string;
  accentColor: 'peach' | 'mint' | 'lavender' | 'sky' | 'sunshine' | 'blush';
}
