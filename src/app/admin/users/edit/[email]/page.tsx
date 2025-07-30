
import { EditUserPageClient } from '@/components/admin/user-form-client';
import { Providers } from '@/components/providers';

export default function EditUserPage() {
  return (
    <Providers>
        <EditUserPageClient />
    </Providers>
  );
}
