
export interface AboutPageValue {
  icon: string;
  title: string;
  description: string;
}

export interface AboutPageContent {
  metaTitle: string;
  metaDescription: string;
  metaOgImage: string;
  heroTitle: string;
  heroSubtitle: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyImage: string;
  storyImageAiHint: string;
  valuesTitle: string;
  valuesSubtitle: string;
  values: AboutPageValue[];
  ctaTitle: string;
  ctaSubtitle: string;
}
