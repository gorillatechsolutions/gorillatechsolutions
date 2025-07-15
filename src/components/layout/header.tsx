
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/navigation';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = NAV_LINKS;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <i className="fa fa-cogs fa-2x text-primary" aria-hidden="true"></i> 
          <span className="text-xl font-bold font-headline text-primary hidden sm:inline">
            Gorilla Tech Solutions
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center justify-center flex-1 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-[#383838]'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center justify-end ml-6">
           <Button asChild>
                <Link href="/contact">
                    Contact Us
                </Link>
            </Button>
        </div>

        <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <i className="fa fa-bars h-6 w-6" aria-hidden="true"></i>
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] p-0 flex flex-col">
                <div className="p-4 border-b">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                        <i className="fa fa-cogs h-6 w-6 text-primary" aria-hidden="true"></i>
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
                           pathname === link.href ? 'text-primary' : 'text-[#383838]'
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <Button asChild className="w-full">
                        <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                            Contact Us
                        </Link>
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
      </div>
    </header>
  );
}
