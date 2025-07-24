
'use client';

import { UserForm } from '@/components/admin/user-form';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { notFound } from 'next/navigation';

export default function EditUserPage({ params }: { params: { email: string } }) {
  const { getUserByEmail, loading } = useAuth();
  const decodedEmail = decodeURIComponent(params.email);
  const user = getUserByEmail(decodedEmail);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="space-y-4 rounded-lg border bg-card p-6">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  if (!user) {
    notFound();
    return null;
  }

  return <UserForm userToEdit={user} />;
}
