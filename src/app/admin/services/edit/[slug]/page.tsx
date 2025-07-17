
import { EditServicePageClient } from '@/components/admin/service-form-client';

export default function EditServicePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return <EditServicePageClient slug={slug} />;
}
