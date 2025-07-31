
'use client';

import { AppForm } from '@/components/admin/app-form';
import { Skeleton } from '@/components/ui/skeleton';
import { useApp } from '@/contexts/app-context';
import type { App } from '@/types/app';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditAppPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getAppBySlug, loading } = useApp();
  const [app, setApp] = useState<App | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!loading && slug) {
      const appToEdit = getAppBySlug(slug);
      setApp(appToEdit);
      setInitialLoading(false);
    }
  }, [slug, loading, getAppBySlug]);

  if (initialLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="space-y-4 rounded-lg border bg-card p-6">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  if (!app) {
    notFound();
    return null;
  }

  return <AppForm key={app.slug} appToEdit={app} />;
}
