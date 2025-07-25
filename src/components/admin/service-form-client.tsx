
'use client';

import { ServiceForm } from '@/components/admin/service-form';
import { Skeleton } from '@/components/ui/skeleton';
import { useService } from '@/contexts/service-context';
import type { Service } from '@/types/service';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export function EditServicePageClient({ slug }: { slug: string }) {
  const { getServiceBySlug, loading } = useService();
  const [service, setService] = useState<Service | null | undefined>(undefined);

  useEffect(() => {
    if (!loading) {
      const serviceToEdit = getServiceBySlug(slug);
      setService(serviceToEdit);
    }
  }, [slug, getServiceBySlug, loading]);

  if (loading || service === undefined) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="space-y-4 rounded-lg border bg-card p-6">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  if (service === null) {
    notFound();
    return null;
  }

  return <ServiceForm serviceToEdit={service} />;
}
