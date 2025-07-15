
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/navigation';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = NAV_LINKS;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-2">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <i className="fa fa-cogs fa-2x text-primary" aria-hidden="true"></i> 
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
                  pathname === link.href ? 'text-primary' : 'text-[#383838]'
                )}
              >
                <i className={`fa ${link.icon} h-4 w-4`} aria-hidden="true"></i>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <i className="fa fa-bars h-6 w-6" aria-hidden="true"></i>
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] p-0">
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b">
                        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                            <i className="fa fa-cogs h-6 w-6 text-primary" aria-hidden="true"></i>
                            <span className="text-lg font-bold font-headline text-primary">Gorilla Tech Solutions</span>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                            <i className="fa fa-times h-6 w-6" aria-hidden="true"></i>
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
                           pathname === link.href ? 'text-primary' : 'text-[#383838]'
                        )}
                      >
                        <i className={`fa ${link.icon} h-5 w-5`} aria-hidden="true"></i>
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
      </div>
    </header>
  );
}
