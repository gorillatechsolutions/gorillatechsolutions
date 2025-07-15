
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/navigation';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = NAV_LINKS;

  return (
    <header className="sticky top-0 z-50 w-full bg-green-700 shadow-md">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <i className="fa fa-cogs fa-2x text-white" aria-hidden="true"></i>
          <span className="text-xl font-bold font-headline text-white hidden sm:inline">
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
                  'text-sm font-medium transition-colors hover:text-white/80',
                  pathname === link.href ? 'text-white' : 'text-green-200'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Button asChild variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 hover:text-white">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="text-white border-white/50 hover:bg-white/10 hover:text-white">
                  <i className="fa fa-bars h-6 w-6" aria-hidden="true"></i>
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] p-0 flex flex-col bg-green-700 text-white">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="p-4 border-b border-white/20">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <i className="fa fa-cogs h-6 w-6 text-white" aria-hidden="true"></i>
                    <span className="text-lg font-bold font-headline text-white">Gorilla Tech</span>
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
                        pathname === link.href ? 'text-white' : 'text-green-200'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t border-white/20">
                  <Button asChild className="w-full bg-white text-green-700 hover:bg-gray-200">
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
