
'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import { CaseStudyList } from '@/components/case-study-list';
import type { CaseStudy } from '@/types/case-study';

// Note: Metadata is commented out because it can't be used in a client component.
// We are fetching data client-side from localStorage, which requires 'use client'.
// export const metadata: Metadata = {
//     title: 'Case Studies | Gorilla Tech Solutions',
//     description: 'Explore insights, tips, and case studies on digital marketing, SEO, PPC, and more from the experts at Gorilla Tech Solutions.',
// };

export default function CaseStudyPage() {
  const [allCaseStudies, setAllCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    try {
        const storedArticles = localStorage.getItem('articles');
        if (storedArticles) {
            setAllCaseStudies(JSON.parse(storedArticles));
        }
    } catch (error) {
        console.error("Failed to parse articles from localStorage", error);
        localStorage.removeItem('articles');
    }
  }, []);

  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Case Studies</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our success stories and see the real-world results we've delivered.
          </p>
        </div>
      </section>
      
      <CaseStudyList allCaseStudies={allCaseStudies} />
    </div>
  );
}
