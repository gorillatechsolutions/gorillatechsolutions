
'use client';

import { UserForm } from '@/components/admin/user-form';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/auth-context';
import type { User } from '@/contexts/auth-context';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export function EditUserPageClient({ params }: { params: { email: string } }) {
  const { getUserByEmail, loading } = useAuth();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const email = decodeURIComponent(params.email);

  useEffect(() => {
    if (!loading) {
      const userToEdit = getUserByEmail(email);
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
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  if (user === null) {
    notFound();
    return null;
  }

  return <UserForm userToEdit={user} />;
}
