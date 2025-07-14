import type { OutputData } from '@editorjs/editorjs';

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
  content: OutputData | string; // Can be Editor.js data or legacy string
};
