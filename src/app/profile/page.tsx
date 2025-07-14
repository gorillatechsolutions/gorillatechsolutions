
'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Edit, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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

    const fullAddress = [user.address, user.state, user.country, user.zipcode].filter(Boolean).join(', ');

    return (
        <div className="container py-12 md:py-20">
            <Card className="max-w-4xl mx-auto p-6 sm:p-8 relative">
                 <div className="absolute top-6 right-6">
                    <Button variant="outline" onClick={() => router.push('/dashboard')}>
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

                        <div className="flex-1 mt-4 sm:mt-0">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary">{user.name}</h1>
                                {user.verified && (
                                    <div className="flex items-center gap-1 text-green-600">
                                        <CheckCircle className="h-5 w-5" />
                                        <span className="font-semibold">Verified</span>
                                    </div>
                                )}
                                {user.country && (
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <MapPin className="h-5 w-5" />
                                        <span className="">{user.country}</span>
                                    </div>
                                )}
                            </div>
                            
                            {user.bio && (
                                 <div className="mt-4">
                                    <p className="text-foreground/90">{user.bio}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <Separator className="my-8" />

                    <div className="space-y-4 text-sm">
                        <h2 className="text-lg font-semibold font-headline text-primary mb-4">Contact & Location</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <div>
                                <p className="font-semibold text-muted-foreground">Full Name</p>
                                <p className="text-foreground">{user.name}</p>
                            </div>
                             {user.username && (
                                <div>
                                    <p className="font-semibold text-muted-foreground">Username</p>
                                    <p className="text-foreground">@{user.username}</p>
                                </div>
                            )}
                            {user.email && (
                                <div>
                                    <p className="font-semibold text-muted-foreground">Email</p>
                                    <p className="text-foreground">{user.email}</p>
                                </div>
                            )}
                             {user.phone && (
                                <div>
                                    <p className="font-semibold text-muted-foreground">Phone</p>
                                    <p className="text-foreground">{user.phone}</p>
                                </div>
                            )}
                             {user.whatsapp && (
                                <div>
                                    <p className="font-semibold text-muted-foreground">WhatsApp</p>
                                    <p className="text-foreground">{user.whatsapp}</p>
                                </div>
                            )}
                             {fullAddress && (
                                <div className="md:col-span-2">
                                    <p className="font-semibold text-muted-foreground">Address</p>
                                    <p className="text-foreground">{fullAddress}</p>
                                </div>
                            )}
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
