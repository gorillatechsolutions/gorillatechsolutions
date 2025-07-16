
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

  useEffect(() => {
    if (slug) {
      const postToEdit = getCaseStudyBySlug(slug as string);
      if (postToEdit) {
        setPost(postToEdit);
      }
    }
  }, [slug, getCaseStudyBySlug]);

  if (loading) {
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
    // Let's show "Not Found" if the post isn't found after loading.
    // This could happen with a bad URL.
    if (!loading) {
        notFound();
    }
    return null; // Or return a "Post not found" message
  }

  return <PostForm postToEdit={post} />;
}
