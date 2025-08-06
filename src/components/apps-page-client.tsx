
'use client';

import { Button } from '@/components/ui/button';
import { AppsList } from '@/components/apps-list';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/app-context';
import type { AppFilter } from '@/types/app-filter';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppsPage } from '@/contexts/apps-page-context';
import { Skeleton } from '@/components/ui/skeleton';

export function AppsPageClient() {
  const pageSearchParams = useSearchParams();
  const initialSearchTerm = pageSearchParams.get('search') || '';
  const initialFilter = (pageSearchParams.get('filter') || 'all') as AppFilter;

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filter, setFilter] = useState<AppFilter>(initialFilter);
  const { apps, loading: appsLoading } = useApp();
  const { content, loading: pageContentLoading } = useAppsPage();

  const loading = appsLoading || pageContentLoading;

  useEffect(() => {
    setSearchTerm(pageSearchParams.get('search') || '');
    setFilter((pageSearchParams.get('filter') || 'all') as AppFilter);
  }, [pageSearchParams]);
  
  if (loading) {
    return (
        <div className="w-full bg-background text-foreground">
            <section className="bg-secondary/30 py-12 md:py-16">
                <div className="container mx-auto px-4 text-center">
                    <Skeleton className="h-12 w-2/3 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                </div>
            </section>
        </div>
    )
  }

  return (
    <div className="w-full bg-background text-foreground">
      <section className="bg-secondary/30 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-primary">{content.heroTitle}</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.heroSubtitle}
          </p>
          <div className="mt-8 max-w-xl mx-auto">
             <form action="/apps" method="GET" onSubmit={(e) => {
                 e.preventDefault();
                 const formData = new FormData(e.currentTarget);
                 const newSearch = formData.get('search') as string;
                 const currentFilter = pageSearchParams.get('filter') || 'all';
                 window.location.href = `/apps?filter=${currentFilter}&search=${encodeURIComponent(newSearch)}`;
             }}>
              <div className="relative">
                <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true"></i>
                <Input
                  type="search"
                  name="search"
                  placeholder="Search our apps..."
                  className="pl-10 text-base w-full"
                  defaultValue={searchTerm}
                />
                 {filter !== 'all' && <input type="hidden" name="filter" value={filter} />}
              </div>
            </form>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button asChild variant={filter === 'all' ? 'default' : 'outline'}>
                    <Link href={`/apps?search=${searchTerm}`}>All Apps</Link>
                </Button>
                <Button asChild variant={filter === 'mobile' ? 'default' : 'outline'}>
                    <Link href={`/apps?filter=mobile&search=${searchTerm}`}>
                        <i className="fa fa-mobile mr-2" aria-hidden="true"></i>
                        Mobile Apps
                    </Link>
                </Button>
                <Button asChild variant={filter === 'web' ? 'default' : 'outline'}>
                    <Link href={`/apps?filter=web&search=${searchTerm}`}>
                        <i className="fa fa-globe mr-2" aria-hidden="true"></i>
                        Web Apps
                    </Link>
                </Button>
                <Button asChild variant={filter === 'desktop' ? 'default' : 'outline'}>
                    <Link href={`/apps?filter=desktop&search=${searchTerm}`}>
                        <i className="fa fa-desktop mr-2" aria-hidden="true"></i>
                        Desktop Apps
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <AppsList allApps={apps} searchTerm={searchTerm} filter={filter} />
        </div>
      </section>

       <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Have a Project in Mind?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Let's turn your idea into a powerful application. Our expert team is ready to build the perfect solution for your business needs.
              </p>
              <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/contact">
                      Get a Free Consultation <i className="fa fa-arrow-right ml-2" aria-hidden="true"></i>
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
