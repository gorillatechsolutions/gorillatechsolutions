
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
             <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Enter your current and new password to update your credentials.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DashboardPasswordForm />
                </CardContent>
            </Card>
        </div>
    );
}
