
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/navigation';
import { BrainCircuit } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = NAV_LINKS.filter(link => {
      if (link.auth === 'loggedIn') return !!user;
      if (link.auth === 'loggedOut') return !user;
      return true;
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <BrainCircuit className="h-8 w-8 text-primary" /> 
          <span className="text-xl font-bold font-headline text-primary">
            Gorilla Tech Solutions
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary flex items-center gap-2',
                  pathname === link.href ? 'text-primary' : 'text-[#383838]',
                  link.name === 'Login' && !user && 'bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground px-4 py-2 rounded-md'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </nav>
          {user && (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-[#383838]">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-2xl" style={{ color: '#f78f39' }}>
                            G
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
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                           <UserCircle className="mr-2 h-4 w-4" />
                           <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
          )}
        </div>

        <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] p-0">
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b">
                        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                            <BrainCircuit className="h-6 w-6 text-primary" />
                            <span className="text-lg font-bold font-headline text-primary">Gorilla Tech Solutions</span>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                  <nav className="flex flex-col gap-4 p-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'text-lg font-medium flex items-center gap-3',
                           pathname === link.href ? 'text-primary' : 'text-[#383838]',
                           link.name === 'Login' && !user && 'bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground px-4 py-2 rounded-md'
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.name}
                      </Link>
                    ))}
                    {user && (
                         <Button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-lg font-medium flex items-center gap-3 justify-start" variant="ghost">
                            <LogOut className="h-5 w-5" />
                            Logout
                         </Button>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
      </div>
    </header>
  );
}
