'use client';

import { ServiceForm } from '@/components/admin/service-form';
import { Skeleton } from '@/components/ui/skeleton';
import { useService } from '@/contexts/service-context';
import type { Service } from '@/types/service';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getServiceBySlug, loading } = useService();
  const [service, setService] = useState<Service | null | undefined>(undefined);

  useEffect(() => {
    if (!loading && slug) {
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

  return <ServiceForm key={service.slug} serviceToEdit={service} />;
}
