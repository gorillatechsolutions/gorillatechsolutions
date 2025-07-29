
import { AppsPageClient } from '@/components/apps-page-client';
import type { AppFilter } from '@/types/app-filter';
import { Suspense } from 'react';
import { Providers } from '@/components/providers';

type AppsPageProps = {
  searchParams: {
    search?: string;
    filter?: string;
  };
};

function AppsPageContent({ searchParams }: AppsPageProps) {
  const searchTerm = searchParams.search || '';
  const filter = (searchParams.filter || 'all') as AppFilter;

  return <AppsPageClient initialSearchTerm={searchTerm} initialFilter={filter} />;
}

export default function AppsPage({ searchParams }: AppsPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Providers>
        <AppsPageContent searchParams={searchParams} />
      </Providers>
    </Suspense>
  );
}
