
import { EditPostPageClient } from '@/components/admin/post-form-client';

export default function EditPostPage({ params: { slug } }: { params: { slug: string } }) {
  return <EditPostPageClient slug={slug} />;
}
