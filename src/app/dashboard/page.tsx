
'use client';

import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, LogOut } from 'lucide-react';

export default function DashboardPage() {
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
            <header className="text-center mb-12">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Welcome, {user.name}!</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    This is your personal dashboard. Here's a summary of your account.
                </p>
            </header>
            <Card className="max-w-2xl mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Your Profile</CardTitle>
                    <CardDescription>Manage your account details below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <User className="h-8 w-8 text-primary" />
                        <div>
                            <p className="font-semibold">Email</p>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <User className="h-8 w-8 text-primary" />
                        <div>
                            <p className="font-semibold">Role</p>
                            <p className="text-muted-foreground capitalize">{user.role}</p>
                        </div>
                    </div>
                    <Button onClick={logout} variant="destructive" className="w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
