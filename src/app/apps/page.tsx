
import { AppsPageClient } from '@/components/apps-page-client';
import { Suspense } from 'react';
import { PublicProviders } from '@/components/providers';

export default function AppsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PublicProviders>
        <AppsPageClient />
      </PublicProviders>
    </Suspense>
  );
}
