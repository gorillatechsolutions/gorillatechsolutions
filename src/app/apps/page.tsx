
import { AppsPageClient } from '@/components/apps-page-client';
import { Suspense } from 'react';
import { PublicProviders } from '@/components/providers';

type AppsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function AppsPage({ searchParams }: AppsPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PublicProviders>
        <AppsPageClient searchParams={searchParams} />
      </PublicProviders>
    </Suspense>
  );
}
