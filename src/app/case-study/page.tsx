
'use client';

import { useSearchParams } from 'next/navigation';
import { CaseStudyList } from '@/components/case-study-list';
import { useCaseStudy } from '@/contexts/case-study-context';

export default function CaseStudyPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const { caseStudies, loading } = useCaseStudy();

  if (loading) {
      return <div className="container py-12">Loading case studies...</div>
  }

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
      
      <CaseStudyList 
        allCaseStudies={caseStudies} 
        initialSearchTerm={searchTerm}
        initialPage={page}
      />
    </div>
  );
}
