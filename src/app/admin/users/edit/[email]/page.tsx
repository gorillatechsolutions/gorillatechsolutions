
import { UserForm } from '@/components/admin/user-form';
import { Providers } from '@/components/providers';
import { EditUserPageClient } from '@/components/admin/user-form-client';

export default function EditUserPage({ params }: { params: { email: string } }) {
  return (
    <Providers>
      <EditUserPageClient params={params} />
    </Providers>
  );
}
