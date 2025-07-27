
export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: string; // Image URL for the service icon
  price: string;
  originalPrice: string;
  popular: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  ogImage?: string;
};
