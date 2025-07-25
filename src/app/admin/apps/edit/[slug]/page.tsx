
import { EditAppPageClient } from '@/components/admin/app-form-client';

export default function EditAppPage({ params }: { params: { slug: string } }) {
  return <EditAppPageClient slug={params.slug} />;
}
