
'use client';

import React from 'react';
import { DashboardPasswordForm } from '@/components/dashboard-password-form';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SecurityPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);
    
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold font-headline">Security</h1>
                <p className="text-muted-foreground">Manage your password and security settings.</p>
            </header>
             <div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Change Password</h2>
                    <p className="text-muted-foreground text-sm">Enter your current and new password to update your credentials.</p>
                </div>
                <DashboardPasswordForm />
            </div>
        </div>
    );
}
