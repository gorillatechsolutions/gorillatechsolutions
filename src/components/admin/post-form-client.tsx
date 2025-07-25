
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { PostForm } from '@/components/admin/post-form';
import type { CaseStudy } from '@/types/case-study';
import { Skeleton } from '@/components/ui/skeleton';
import { useCaseStudy } from '@/contexts/case-study-context';

export function EditPostPageClient({ slug }: { slug: string }) {
  const { getCaseStudyBySlug, loading } = useCaseStudy();
  const [post, setPost] = useState<CaseStudy | null | undefined>(undefined);

  useEffect(() => {
    if (!loading) {
      const postToEdit = getCaseStudyBySlug(slug);
      setPost(postToEdit);
    }
  }, [slug, getCaseStudyBySlug, loading]);

  if (loading || post === undefined) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="space-y-4 rounded-lg border bg-card p-6">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  if (post === null) {
    notFound();
    return null;
  }

  return <PostForm postToEdit={post} />;
}
