
import { EditUserPageClient } from '@/components/admin/user-form-client';

export default function EditUserPage({ params }: { params: { email: string } }) {
  return <EditUserPageClient email={params.email} />;
}
