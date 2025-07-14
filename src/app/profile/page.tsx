
'use client';

import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, KeyRound } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardProfileForm } from '@/components/dashboard-profile-form';
import { DashboardPasswordForm } from '@/components/dashboard-password-form';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
    const { user, logout } = useAuth();
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

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="security">
                        <KeyRound className="mr-2 h-4 w-4" />
                        Security
                    </TabsTrigger>
                </TabsList>
                
                <Separator className="my-6" />

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details here. Click save when you're done.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DashboardProfileForm currentUser={user} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                     <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your password here. Make sure it's a strong one.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DashboardPasswordForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
