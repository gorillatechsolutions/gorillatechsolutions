
import { EditAppPageClient } from '@/components/admin/app-form-client';

export default function EditAppPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return <EditAppPageClient slug={slug} />;
}
