
import { AppsPageClient } from '@/components/apps-page-client';
import type { AppFilter } from '@/types/app-filter';

type AppsPageProps = {
  searchParams: {
    search?: string;
    filter?: string;
  };
};

export default function AppsPage({ searchParams }: AppsPageProps) {
  const searchTerm = searchParams.search || '';
  const filter = (searchParams.filter || 'all') as AppFilter;

  return <AppsPageClient initialSearchTerm={searchTerm} initialFilter={filter} />;
}
