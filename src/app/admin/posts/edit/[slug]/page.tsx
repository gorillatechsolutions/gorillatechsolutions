
import { EditPostPageClient } from '@/components/admin/post-form-client';

export default function EditPostPage({ params }: { params: { slug: string } }) {
  return <EditPostPageClient params={params} />;
}
