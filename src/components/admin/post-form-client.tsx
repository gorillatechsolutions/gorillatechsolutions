
'use client';

// This component is no longer used and can be deleted.
// The logic has been moved directly into the page component for a more robust data flow.
// See /src/app/admin/posts/edit/[slug]/page.tsx for the new implementation.

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { PostForm } from '@/components/admin/post-form';
import type { CaseStudy } from '@/types/case-study';
import { Skeleton } from '@/components/ui/skeleton';
import { useCaseStudy } from '@/contexts/case-study-context';

export function EditPostPageClient({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { getCaseStudyBySlug, loading } = useCaseStudy();
  const [post, setPost] = useState<CaseStudy | null>(null);

  useEffect(() => {
    if (!loading) {
      const postToEdit = getCaseStudyBySlug(slug);
      setPost(postToEdit);
    }
  }, [slug, loading, getCaseStudyBySlug]);

  if (loading) {
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

  if (!post) {
    notFound();
    return null;
  }

  return <PostForm key={post.slug} postToEdit={post} />;
}
