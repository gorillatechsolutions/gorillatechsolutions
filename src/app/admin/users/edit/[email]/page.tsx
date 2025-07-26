
import { EditUserPageClient } from '@/components/admin/user-form-client';

export default function EditUserPage({ params }: { params: { email: string } }) {
  const { email } = params;
  return <EditUserPageClient email={email} />;
}
