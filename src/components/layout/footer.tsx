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
                    <path d="M16.75,13.96C17,14.26 17,14.81 16.7,15.11C16.4,15.41 15.1,16.5 14.75,16.7C14.4,16.9 14,16.95 13.7,16.75C13.35,16.55 11.95,16.05 10.2,14.6C8,12.75 7,10.6 6.8,10.2C6.6,9.8 7.1,9.6 7.3,9.4C7.5,9.2 7.7,8.95 7.8,8.75C7.9,8.55 7.9,8.4 7.8,8.2C7.7,8 7.15,6.65 6.9,6.05C6.65,5.45 6.4,5.35 6.15,5.35C5.9,5.35 5.65,5.35 5.4,5.35C5.15,5.35 4.8,5.45 4.5,5.75C4.2,6.05 3.5,6.65 3.5,7.95C3.5,9.25 4.5,10.5 4.65,10.7C4.8,10.9 6.25,13.2 8.55,14.25C10.85,15.3 11.5,15.45 12.5,15.15C13.3,14.9 14.55,14.25 14.9,13.6C15.25,13 15.3,12.55 15.25,12.45C15.2,12.3 15.1,12.25 14.95,12.2C14.8,12.15 14.45,12 14.15,11.85C13.85,11.75 13.65,11.7 13.55,11.9C13.45,12.1 12.95,12.7 12.8,12.85C12.65,13 12.5,13.05 12.35,12.95C12.2,12.85 11.55,12.6 10.9,12C10.15,11.3 9.6,10.5 9.45,10.2C9.3,9.9 9.4,9.75 9.55,9.6C9.65,9.5 9.8,9.3 9.9,9.15C10,9 10.05,8.85 10.1,8.7C10.15,8.55 10.1,8.45 10.05,8.35C10,8.25 9.5,7.1 9.25,6.5C9,5.9 8.75,5.8 8.55,5.8C8.35,5.8 8.1,5.8 7.85,5.8H7.6C7.35,5.8 7,5.9 6.75,6.2C6.5,6.5 5.85,7.1 5.85,8.4C5.85,9.7 6.85,10.95 7,11.15C7.15,11.35 8.55,13.55 10.85,14.6C12.8,15.5 13.8,15.65 14.6,15.25C15.25,14.95 16.3,14.25 16.55,13.5C16.8,12.75 16.8,12.3 16.75,12.2Z" />
                </svg>
            </Link>
            <Link href="#" aria-label="Google Business" className="h-8 w-8 flex items-center justify-center rounded-full bg-social-google text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.5,18.33 21.5,12.33C21.5,11.76 21.35,11.1 21.35,11.1Z" />
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
