
import { EditUserPageClient } from '@/components/admin/user-form-client';

export default function EditUserPage({ params: { email } }: { params: { email: string } }) {
  return <EditUserPageClient email={email} />;
}
