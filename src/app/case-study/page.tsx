
'use client';

import { Suspense } from 'react';
import { CaseStudyList } from '@/components/case-study-list';
import { useCaseStudy } from '@/contexts/case-study-context';
import { useCaseStudiesPage } from '@/contexts/case-studies-page-context';
import { Skeleton } from '@/components/ui/skeleton';
import { PublicProviders } from '@/components/providers';

type CaseStudyPageProps = {
  searchParams: {
    search?: string;
    page?: string;
  };
};

function CaseStudyPageComponent({ searchTerm, page }: { searchTerm: string; page: number }) {
  const { caseStudies, loading: caseStudiesLoading } = useCaseStudy();
  const { content, loading: pageContentLoading } = useCaseStudiesPage();

  const loading = caseStudiesLoading || pageContentLoading;

  if (loading) {
    return (
        <div className="w-full bg-background text-foreground">
          <section className="bg-secondary/30 py-8 md:py-12">
            <div className="container mx-auto px-4 text-center">
              <Skeleton className="h-12 w-2/3 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
            </div>
          </section>
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-xl mx-auto">
                 <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </section>
        </div>
    );
  }

  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">{content.heroTitle}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.heroSubtitle}
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


export default function CaseStudyPage({ searchParams }: CaseStudyPageProps) {
  const searchTerm = searchParams?.search || '';
  const page = Number(searchParams?.page) || 1;
    
  return (
    <PublicProviders>
      <Suspense fallback={<div className="container py-12">Loading...</div>}>
        <CaseStudyPageComponent searchTerm={searchTerm} page={page} />
      </Suspense>
    </PublicProviders>
  );
}
