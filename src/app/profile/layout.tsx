
'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { User, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            setIsLoading(false);
        }
    }, [user, router]);

    if (isLoading) {
        return (
            <div className="container py-12 md:py-20 text-center">
                <p>Loading...</p>
            </div>
        );
    }
    
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTrigger />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu className="pt-20">
                        <SidebarMenuItem>
                            <Link href="/profile" passHref>
                                <SidebarMenuButton asChild tooltip="Profile">
                                    <div>
                                        <User />
                                        <span>Profile</span>
                                    </div>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                             <Link href="/profile/security" passHref>
                                <SidebarMenuButton asChild tooltip="Security">
                                    <div>
                                        <Lock />
                                        <span>Security</span>
                                    </div>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
            <div className="flex-1">
                {children}
            </div>
        </SidebarProvider>
    );
}
