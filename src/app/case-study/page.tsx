
import type { Metadata } from 'next';
import { CaseStudyList } from '@/components/case-study-list';
import { demoCaseStudies } from '@/lib/demo-data';

export const metadata: Metadata = {
    title: 'Case Studies | Gorilla Tech Solutions',
    description: 'Explore insights, tips, and case studies on digital marketing, SEO, PPC, and more from the experts at Gorilla Tech Solutions.',
};

export const dynamic = 'force-static';

export default function CaseStudyPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const searchTerm = typeof searchParams?.search === 'string' ? searchParams.search : '';
  const page = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1;

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
        allCaseStudies={demoCaseStudies} 
        initialSearchTerm={searchTerm}
        initialPage={page}
      />
    </div>
  );
}
