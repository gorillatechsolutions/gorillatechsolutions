
'use client';

import { ReviewForm } from '@/components/admin/review-form';
import { Skeleton } from '@/components/ui/skeleton';
import { useReview } from '@/contexts/review-context';
import type { Review } from '@/types/review';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditReviewPage() {
  const params = useParams();
  const id = params.id as string;
  const { getReviewById, loading } = useReview();
  const [review, setReview] = useState<Review | null | undefined>(undefined);

  useEffect(() => {
    if (!loading && id) {
      const reviewToEdit = getReviewById(id);
      setReview(reviewToEdit);
    }
  }, [id, getReviewById, loading]);

  if (loading || review === undefined) {
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

  if (review === null) {
    notFound();
    return null;
  }

  return <ReviewForm key={review.id} reviewToEdit={review} />;
}
