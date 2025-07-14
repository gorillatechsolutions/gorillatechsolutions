
'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, FileText, Settings } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            router.push('/login');
        } else {
            setIsLoading(false);
        }
    }, [user, router]);

    if (isLoading) {
        return (
            <div className="container py-12 md:py-20 text-center">
                <p>Loading Admin Dashboard...</p>
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
                            <Link href="/dashboard" passHref>
                                <SidebarMenuButton asChild tooltip="Dashboard">
                                    <div>
                                        <LayoutDashboard />
                                        <span>Dashboard</span>
                                    </div>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                             <Link href="/dashboard/users" passHref>
                                <SidebarMenuButton asChild tooltip="Users">
                                    <div>
                                        <Users />
                                        <span>Users</span>
                                    </div>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                             <Link href="#" passHref>
                                <SidebarMenuButton asChild tooltip="Settings">
                                    <div>
                                        <Settings />
                                        <span>Settings</span>
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
