
import { EditServicePageClient } from '@/components/admin/service-form-client';

export default function EditServicePage({ params: { slug } }: { params: { slug: string } }) {
  return <EditServicePageClient slug={slug} />;
}
