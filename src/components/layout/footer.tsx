import Link from 'next/link';
import { BotMessageSquare, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NAV_LINKS } from '@/lib/navigation';

export function Footer() {
  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 py-12">
        {/* Column 1: Logo and About */}
        <div className="flex flex-col gap-4 items-start">
          <Link href="/" className="flex items-center gap-2">
            <BotMessageSquare className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline text-primary">Gorilla Tech Solutions</span>
          </Link>
          <p className="text-muted-foreground text-sm">
            Driving growth with data-driven digital marketing strategies that deliver results.
          </p>
          <div className="flex gap-4 mt-2">
            <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
          </div>
        </div>

        {/* Column 2: Links and Contact */}
        <div className="lg:text-right">
          <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="font-headline font-semibold mb-4 mt-8">Contact Us</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>123 Marketing Lane, New York, NY 10001</li>
            <li className="pt-2"><a href="tel:+1234567890" className="hover:text-primary">+1 (234) 567-890</a></li>
            <li><a href="mailto:hello@gorillatech.solutions" className="hover:text-primary">hello@gorillatech.solutions</a></li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div>
          <h3 className="font-headline font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Stay up to date with the latest marketing trends.
          </p>
          <form className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-6 lg:px-8 text-sm text-muted-foreground gap-2">
          <p>&copy; {new Date().getFullYear()} Gorilla Tech Solutions. All rights reserved.</p>
          <p>Website by Firebase Studio</p>
        </div>
      </div>
    </footer>
  );
}
