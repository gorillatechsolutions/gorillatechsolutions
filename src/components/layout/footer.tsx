import Link from 'next/link';
import { BotMessageSquare, Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const footerLinks = {
    company: [
        { name: 'Work with Us', href: '#' },
        { name: 'Invest with Us', href: '#' },
        { name: 'Website Roadmap', href: '#' },
    ],
    about: [
        { name: 'Site Map', href: '#'},
        { name: 'About Us', href: '/about' },
        { name: 'Privacy Policy', href: '#' },
    ],
    legal: [
        { name: 'Refund Policy', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Disclaimer', href: '#' },
    ]
}


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
          <div className="flex gap-3 mt-2">
            <Link href="#" aria-label="Facebook" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-facebook text-white"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" aria-label="Instagram" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-instagram text-white"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" aria-label="LinkedIn" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-linkedin text-white"><Linkedin className="h-5 w-5" /></Link>
            <Link href="#" aria-label="WhatsApp" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-whatsapp text-white">
                <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2M12.04 3.67c4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23c-1.52 0-2.98-.41-4.29-1.19L6.5 20.4l1.58-1.26c-.88-1.33-1.38-2.89-1.38-4.58 0-4.54 3.69-8.23 8.23-8.23m2.54 6.39c-.14-.23-.53-.43-.8-.5-.27-.07-.46-.07-.64.24-.18.31-.7.88-.86 1.06-.16.18-.31.2-.46.06-.15-.14-.64-.24-1.22-.76-.45-.4-1.03-1.1-1.15-1.28-.12-.18-.01-.28.11-.39.1-.09.23-.24.34-.36s.17-.21.25-.36c.08-.14.04-.28-.02-.39-.07-.11-.64-1.53-.88-2.1-.23-.55-.46-.48-.63-.48-.16 0-.34-.02-.51-.02s-.46.06-.7.34c-.23.27-.89.86-1.03 2.06s.14 2.26.79 3.23c.65.97 1.74 2.18 3.71 3.29 1.97 1.11 2.53.89 3.1.86.57-.03 1.03-.43 1.17-.64.14-.21.14-.41.1-.48l-.01-.01z"/>
                </svg>
            </Link>
            <Link href="#" aria-label="Google Business" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-google text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.6 12.2c0-.7-.06-1.3-.18-1.9H12v3.6h3.7c-.16.9-.6 1.7-1.26 2.2v2.4h3.1c1.8-1.7 2.8-4.1 2.8-6.9z"/>
                <path d="M12 21c2.9 0 5.3-1 7-2.7l-3.1-2.4c-1 .6-2.2.9-3.9.9-3-0-5.5-2-6.4-4.7H2.3v2.5C4.3 18.1 7.9 21 12 21z"/>
                <path d="M5.6 13.7c-.1-.3-.2-.6-.2-1s.1-.7.2-1V9.2H2.3C1.5 10.6 1 12.2 1 14s.5 3.4 1.3 4.8l3.3-2.5z"/>
                <path d="M12 5.4c1.6 0 3 .5 4.1 1.5l2.7-2.7C17.3 2.1 14.9 1 12 1 7.9 1 4.3 3.9 2.3 7.3l3.3 2.5c.9-2.7 3.4-4.7 6.4-4.7z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Column 2: Links */}
        <div className="lg:text-center">
          <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col items-start lg:items-center space-y-2">
            <li className='flex flex-wrap items-center justify-center'>
                {footerLinks.company.map((link, index) => (
                  <div key={link.name} className="flex items-center">
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary whitespace-nowrap px-2">
                      {link.name}
                    </Link>
                    {index < footerLinks.company.length - 1 && <span className="text-muted-foreground">&bull;</span>}
                  </div>
                ))}
            </li>
            <li className='flex flex-wrap items-center justify-center'>
                {footerLinks.about.map((link, index) => (
                    <div key={link.name} className="flex items-center">
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary whitespace-nowrap px-2">
                        {link.name}
                    </Link>
                    {index < footerLinks.about.length - 1 && <span className="text-muted-foreground">&bull;</span>}
                    </div>
                ))}
            </li>
            <li className='flex flex-wrap items-center justify-center'>
                {footerLinks.legal.map((link, index) => (
                    <div key={link.name} className="flex items-center">
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary whitespace-nowrap px-2">
                        {link.name}
                    </Link>
                    {index < footerLinks.legal.length - 1 && <span className="text-muted-foreground">&bull;</span>}
                    </div>
                ))}
            </li>
          </ul>
        </div>

        {/* Column 3: Connect With Us */}
        <div className="flex flex-col items-center text-center">
          <h3 className="font-headline font-semibold mb-4">Connect With Us</h3>
          <div className="space-y-2 text-sm flex flex-col items-center">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
              <p className="text-muted-foreground">123 Marketing Lane<br/>New York, NY 10001</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
              <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">+1 (234) 567-890</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
              <a href="mailto:hello@gorillatech.solutions" className="text-muted-foreground hover:text-primary">hello@gorillatech.solutions</a>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="#">
                      <Github className="mr-2 h-4 w-4" />
                      Download Source Code
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-[#3F4550] text-white border-0">
                  <p>Important Note: Content and code to be Used for Educational Purposes Only; Restrictions on Use.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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
