
'use client';

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardProfileForm } from '@/components/dashboard-profile-form';
import { DashboardPasswordForm } from '@/components/dashboard-password-form';

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="container py-12 md:py-20 text-center">
                <p>Redirecting to login...</p>
            </div>
        );
    }

    return (
        <div className="container py-12 md:py-20">
            <header className="mb-12">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Your Profile</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Welcome back, {user.name}! Manage your profile and account settings here.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details here. Click save when you're done.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DashboardProfileForm currentUser={user} />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                     <Card>
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Update your password here. Make sure it's a strong one.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DashboardPasswordForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
