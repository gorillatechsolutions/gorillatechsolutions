
export type CaseStudy = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  dataAiHint: string;
  tags: string[];
  author: string;
  date: string;
  views: number;
  content: string; // Content is now a plain string (Markdown or text)
};
