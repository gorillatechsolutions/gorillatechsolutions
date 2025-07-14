
'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, MapPin, Building2, List, Edit } from 'lucide-react';
import Link from 'next/link';

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
            <Card className="max-w-4xl mx-auto p-6 sm:p-8 relative">
                 <div className="absolute top-6 right-6">
                    <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>
                <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                        <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-white shadow-md">
                            <AvatarImage src="https://placehold.co/200x200.png" alt={user.name} data-ai-hint="woman portrait" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{user.name}</h1>
                                {user.verified && (
                                    <div className="flex items-center gap-1 text-green-600">
                                        <CheckCircle className="h-5 w-5" />
                                        <span className="font-semibold">Verified</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 space-y-2 text-muted-foreground">
                                {user.title && user.company && (
                                    <div className="flex items-center gap-3">
                                        <Building2 className="h-5 w-5" />
                                        <p>{user.title}, <span className="font-medium text-primary hover:underline"><a href="#">{user.company}</a></span></p>
                                    </div>
                                )}
                                {user.location && (
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5" />
                                        <p>{user.location}</p>
                                    </div>
                                )}
                                {user.expertise && (
                                    <div className="flex items-center gap-3">
                                        <List className="h-5 w-5" />
                                        <p>{user.expertise}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {user.bio && (
                         <div className="mt-6 pt-6 border-t">
                            <p className="text-foreground/90">{user.bio}</p>
                        </div>
                    )}

                </CardContent>
            </Card>
        </div>
    );
}
