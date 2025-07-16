
export type AppLinks = {
  web?: string;
  playStore?: string;
  appStore?: string;
  download?: string;
  buy?: string;
};

export type App = {
  slug: string;
  title: string;
  category: string;
  rating: number;
  downloads: string;
  description: string;
  icon: string;
  dataAiHint: string;
  links: AppLinks;
  badge?: string;
};
