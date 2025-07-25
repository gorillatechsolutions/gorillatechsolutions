
import { EditReviewPageClient } from '@/components/admin/review-form-client';

export default function EditReviewPage({ params }: { params: { id: string } }) {
  return <EditReviewPageClient id={params.id} />;
}
