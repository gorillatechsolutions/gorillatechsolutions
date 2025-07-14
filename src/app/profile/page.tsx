
'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ProfileForm } from '@/components/profile-form';

export default function ProfilePage() {
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
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details here. Click save when you're done.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm currentUser={user} />
                </CardContent>
            </Card>
        </div>
    );
}
