
import { EditReviewPageClient } from '@/components/admin/review-form-client';

export default function EditReviewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <EditReviewPageClient id={id} />;
}
