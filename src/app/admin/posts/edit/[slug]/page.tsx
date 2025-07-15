
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PostForm } from '@/components/admin/post-form';
import type { CaseStudy } from '@/types/case-study';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const storedPosts = localStorage.getItem('caseStudies');
      if (storedPosts) {
        const posts: CaseStudy[] = JSON.parse(storedPosts);
        const postToEdit = posts.find(p => p.slug === slug);
        if (postToEdit) {
            setPost(postToEdit);
        }
      }
    }
    setLoading(false);
  }, [slug]);

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
    return <div>Post not found.</div>;
  }

  return <PostForm postToEdit={post} />;
}
