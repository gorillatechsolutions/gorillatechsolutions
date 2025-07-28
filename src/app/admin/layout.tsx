
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCog, faSignOutAlt, faPenToSquare, faMobileScreenButton, faConciergeBell, faFileLines, faStar } from '@fortawesome/free-solid-svg-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

const navItems = [
  { href: '/admin', icon: faTachometerAlt, label: 'Dashboard', exact: true },
  { href: '/admin/users', icon: faUsers, label: 'Users' },
  { href: '/admin/posts', icon: faPenToSquare, label: 'Posts' },
  { href: '/admin/apps', icon: faMobileScreenButton, label: 'Apps' },
  { href: '/admin/services', icon: faConciergeBell, label: 'Services' },
  { href: '/admin/reviews', icon: faStar, label: 'Reviews' },
  { href: '/admin/pages', icon: faFileLines, label: 'Pages' },
  { href: '/admin/settings', icon: faCog, label: 'Settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, loading, router]);


  if (loading || !user || user.role !== 'admin') {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 w-full justify-start h-auto px-2 py-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://placehold.co/100x100.png" alt={user.name} data-ai-hint="person avatar" />
                  <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : 'A'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-semibold text-sidebar-foreground truncate">{user.name}</span>
                    <span className="text-xs text-sidebar-foreground/70 truncate">{user.email}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton asChild isActive={pathname.startsWith(item.href) && (item.exact ? pathname === item.href : true)}>
                    <a>
                        <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                        <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            {/* Can add footer items here if needed */}
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
