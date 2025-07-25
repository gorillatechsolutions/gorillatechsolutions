
import { EditReviewPageClient } from '@/components/admin/review-form-client';

export default function EditReviewPage({ params: { id } }: { params: { id: string } }) {
  return <EditReviewPageClient id={id} />;
}
