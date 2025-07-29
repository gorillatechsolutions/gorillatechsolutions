
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faBars, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth, User } from '@/contexts/auth-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, Mail, LogOut, MessageSquare, Gem } from 'lucide-react';
import { useMessage } from '@/contexts/message-context';
import { useSiteSettings } from '@/contexts/site-settings-context';
import Image from 'next/image';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Our Services', href: '/services' },
  { name: 'Case Studies', href: '/case-study' },
  { name: 'Our Apps', href: '/apps' },
  { name: 'Contact', href: '/contact' },
];

function UserNav({ user, onLogout }: { user: User, onLogout: () => void }) {
    const { getUnreadCount } = useMessage();
    const unreadCount = getUnreadCount(user.email);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="https://placehold.co/100x100.png" alt={user.name} data-ai-hint="person avatar" />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground capitalize">{user.role} Account</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/messages">
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                        {unreadCount > 0 && (
                            <span className="relative ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">{unreadCount}</span>
                        )}
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link href="/upgrade">
                        <Gem className="mr-2 h-4 w-4 text-accent" />
                        <span className="text-accent font-semibold">Upgrade Account</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { settings: siteSettings, loading: siteLoading } = useSiteSettings();
  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm" style={{ backgroundColor: '#f2f5f7' }}>
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
          {siteLoading ? (
            <FontAwesomeIcon icon={faCogs} className="h-8 w-8 text-primary" />
          ) : (
            <Image src={siteSettings.headerLogo} alt="Gorilla Tech Solutions" width={180} height={40} />
          )}
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            {isAdmin && (
               <Link href="/admin" className={cn('text-sm font-medium transition-colors hover:text-primary/80 flex items-center gap-1', pathname.startsWith('/admin') ? 'text-primary' : 'text-foreground/60')}>
                 <FontAwesomeIcon icon={faTachometerAlt} className="h-4 w-4" />
                 Dashboard
               </Link>
            )}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary/80',
                  pathname === link.href ? 'text-primary' : 'text-foreground/60'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <UserNav user={user} onLogout={logout} />
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] p-0 flex flex-col" style={{ backgroundColor: '#f2f5f7' }}>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="p-4 border-b">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <FontAwesomeIcon icon={faCogs} className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold font-headline text-primary">Gorilla Tech</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 p-4 flex-1">
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className={cn('text-lg font-medium flex items-center gap-2', pathname.startsWith('/admin') ? 'text-primary' : 'text-foreground/80')}>
                      <FontAwesomeIcon icon={faTachometerAlt} className="h-5 w-5" />
                      Dashboard
                    </Link>
                  )}
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'text-lg font-medium',
                        pathname === link.href ? 'text-primary' : 'text-foreground/80'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t space-y-2">
                   {user ? (
                    <>
                     <Button asChild className="w-full" variant="secondary">
                       <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
                     </Button>
                     <Button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full">
                       Logout
                     </Button>
                    </>
                   ) : (
                     <Button asChild className="w-full">
                       <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                     </Button>
                   )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
