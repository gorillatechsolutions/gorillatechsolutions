
export interface ProcessStep {
  imageUrl: string;
  imageAiHint: string;
  title: string;
  description: string;
}

export interface Stat {
  imageUrl: string;
  imageAiHint: string;
  value: number;
  label: string;
  description: string;
}

export interface HomePageContent {
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  metaOgImage: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAiHint: string;
  heroCtaButtonText: string;
  heroCtaButtonLink: string;
  heroSecondaryButtonText: string;
  heroSecondaryButtonLink: string;
  processTitle: string;
  processSubtitle: string;
  processDescription: string;
  processSteps: ProcessStep[];
  commitmentTitle: string;
  stats: Stat[];
  benefitsTitle: string;
  benefits: string[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaImage: string;
  ctaImageAiHint: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}
