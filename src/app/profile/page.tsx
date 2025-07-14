
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ProfileForm } from '@/components/profile-form';
import { Button } from '@/components/ui/button';
import { Edit, User as UserIcon, AtSign, Phone, MessageSquare, Map, Globe, Mail, Landmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => {
    return (
        <div className="flex items-start gap-4">
            <div className="text-muted-foreground w-6 h-6 flex-shrink-0">{icon}</div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium">{value || '-'}</p>
            </div>
        </div>
    );
};


export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        // This is a fallback, the layout should handle redirection.
        return null;
    }

    const handleUpdate = () => {
        setIsEditing(false);
    }

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Profile</h1>
                    <p className="text-muted-foreground">Manage your personal information.</p>
                </div>
                {!isEditing && (
                     <Button onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                )}
            </header>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        {isEditing ? "Update your personal details here. Click save when you're done." : "View your current profile details below."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isEditing ? (
                        <ProfileForm currentUser={user} onUpdate={handleUpdate} onCancel={() => setIsEditing(false)} />
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-primary mb-4">Personal Information</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <DetailItem icon={<UserIcon />} label="Full Name" value={user.name} />
                                    <DetailItem icon={<AtSign />} label="Username" value={user.username} />
                                    <DetailItem icon={<Mail />} label="Email Address" value={user.email} />
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-medium text-primary mb-4">Contact Details</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <DetailItem icon={<Phone />} label="Phone Number" value={user.phone} />
                                    <DetailItem icon={<MessageSquare />} label="WhatsApp Number" value={user.whatsapp} />
                                </div>
                            </div>
                            <Separator />
                             <div>
                                <h3 className="text-lg font-medium text-primary mb-4">Location</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <DetailItem icon={<Map />} label="Address" value={user.address} />
                                    <DetailItem icon={<Landmark />} label="State / Province" value={user.state} />
                                    <DetailItem icon={<Map />} label="ZIP / Postal Code" value={user.zipcode} />
                                    <DetailItem icon={<Globe />} label="Country" value={user.country} />
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
