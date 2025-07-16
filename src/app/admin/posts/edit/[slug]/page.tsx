
'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { PostForm } from '@/components/admin/post-form';
import type { CaseStudy } from '@/types/case-study';
import { Skeleton } from '@/components/ui/skeleton';
import { useCaseStudy } from '@/contexts/case-study-context';

export default function EditPostPage() {
  const { slug } = useParams();
  const { getCaseStudyBySlug, loading } = useCaseStudy();
  const [post, setPost] = useState<CaseStudy | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      // Still loading data from context, wait.
      return;
    }
    
    if (slug) {
      const postToEdit = getCaseStudyBySlug(slug as string);
      setPost(postToEdit);
    }
    setInitialLoading(false);

  }, [slug, getCaseStudyBySlug, loading]);

  if (initialLoading) {
    return (
        <div className="space-y-6">
            <Skeleton className="h-10 w-1/3" />
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-40 w-full" />
            </div>
        </div>
    );
  }

  if (!post) {
    // If we've finished loading and there's still no post, it's a 404.
    notFound();
    return null; 
  }

  return <PostForm postToEdit={post} />;
}
