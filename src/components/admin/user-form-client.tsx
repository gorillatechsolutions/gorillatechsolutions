
'use client';

import { UserForm } from '@/components/admin/user-form';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { User } from '@/contexts/auth-context';

export function EditUserPageClient({ email }: { email: string }) {
  const { getUserByEmail, loading } = useAuth();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (!loading) {
      const decodedEmail = decodeURIComponent(email);
      const userToEdit = getUserByEmail(decodedEmail);
      setUser(userToEdit);
    }
  }, [email, getUserByEmail, loading]);

  if (loading || user === undefined) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="space-y-4 rounded-lg border bg-card p-6">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-1/f_our" />
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
