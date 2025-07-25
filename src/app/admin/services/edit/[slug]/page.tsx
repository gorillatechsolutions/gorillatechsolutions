
import { EditServicePageClient } from '@/components/admin/service-form-client';

export default function EditServicePage({ params }: { params: { slug: string } }) {
  return <EditServicePageClient slug={params.slug} />;
}
