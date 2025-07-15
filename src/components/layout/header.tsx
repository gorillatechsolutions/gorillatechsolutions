
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faBars } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/');
  };

  const navLinks = NAV_LINKS;

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm" style={{ backgroundColor: '#f2f5f7' }}>
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <FontAwesomeIcon icon={faCogs} className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline text-primary hidden sm:inline">
            Gorilla Tech Solutions
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
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
            {isLoggedIn ? (
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
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
                  {navLinks.map((link) => (
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
                   {isLoggedIn ? (
                     <Button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full">
                       Logout
                     </Button>
                   ) : (
                     <>
                       <Button asChild className="w-full" variant="ghost">
                         <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                       </Button>
                       <Button asChild className="w-full">
                         <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                       </Button>
                     </>
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
