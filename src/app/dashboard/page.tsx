
'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardProfileForm } from '@/components/dashboard-profile-form';

export default function DashboardProfilePage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        // This is a fallback, the layout should handle redirection.
        return null;
    }

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold font-headline">Profile</h1>
                <p className="text-muted-foreground">Manage your personal information.</p>
            </header>
            <div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    <p className="text-muted-foreground text-sm">Update your personal details here. Click save when you're done.</p>
                </div>
                <DashboardProfileForm currentUser={user} />
            </div>
        </div>
    );
}
