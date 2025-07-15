
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCog, faBoxOpen, faChartLine, faSignOutAlt, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/admin', icon: faTachometerAlt, label: 'Dashboard' },
  { href: '/admin/users', icon: faUsers, label: 'Users' },
  { href: '/admin/posts', icon: faPenToSquare, label: 'Posts' },
  { href: '/admin/products', icon: faBoxOpen, label: 'Products' },
  { href: '/admin/analytics', icon: faChartLine, label: 'Analytics' },
  { href: '/admin/settings', icon: faCog, label: 'Settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string, role: string } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      if (userData.role !== 'admin') {
        router.push('/');
      } else {
        setUser(userData);
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!isClient || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-lg font-semibold">Loading Admin Dashboard...</div>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://placehold.co/100x100.png" alt="Admin" data-ai-hint="person avatar" />
              <AvatarFallback>{user.name ? user.name.charAt(0) : 'A'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-sidebar-foreground">{user.name}</span>
                <span className="text-xs text-sidebar-foreground/70">{user.email}</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton isActive={pathname === item.href}>
                    <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <Button variant="ghost" className="justify-start gap-2" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
                <span>Logout</span>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background p-4 sm:justify-end">
            <SidebarTrigger className="sm:hidden"/>
            <div className="text-foreground font-semibold">
                Welcome, {user.name}!
            </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/40">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
