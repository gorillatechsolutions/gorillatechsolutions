
import { EditAppPageClient } from '@/components/admin/app-form-client';

export default function EditAppPage({ params: { slug } }: { params: { slug: string } }) {
  return <EditAppPageClient slug={slug} />;
}
