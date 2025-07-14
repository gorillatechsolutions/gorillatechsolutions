
'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
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
            <div className="flex h-screen items-center justify-center">
                <p>Loading Admin Dashboard...</p>
            </div>
        );
    }
    
    const navItems = [
        { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/dashboard/articles", icon: FileText, label: "Articles" },
        { href: "/dashboard/users", icon: Users, label: "Users" },
        { href: "#", icon: Settings, label: "Settings" }
    ];

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTrigger />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu className="pt-20">
                        {navItems.map((item) => (
                             <SidebarMenuItem key={item.href}>
                                <Link href={item.href} passHref>
                                    <SidebarMenuButton asChild tooltip={item.label} isActive={pathname === item.href}>
                                        <div>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
            <div className="flex-1 bg-muted/40">
                {children}
            </div>
        </SidebarProvider>
    );
}
