import Link from 'next/link';
import { BotMessageSquare, Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Github, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';

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
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.06 21.94L7.3 20.58C8.75 21.37 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM12.04 20.13C10.56 20.13 9.12 19.71 7.89 18.9L7.52 18.68L4.82 19.4L5.64 16.79L5.41 16.42C4.55 15.04 4.09 13.5 4.09 11.91C4.09 7.55 7.69 4 12.04 4C16.39 4 20 7.55 20 11.91C20 16.27 16.39 20.13 12.04 20.13ZM16.56 14.45C16.31 14.18 15.82 14.04 15.54 13.88C15.27 13.72 14.12 13.16 13.89 13.08C13.66 13 13.49 12.96 13.31 13.24C13.14 13.52 12.68 14.04 12.55 14.2C12.41 14.37 12.28 14.41 12.01 14.29C11.74 14.18 10.97 13.94 10.04 13.11C9.31 12.46 8.79 11.64 8.63 11.36C8.47 11.08 8.59 10.97 8.71 10.85C8.82 10.74 8.95 10.56 9.07 10.42C9.18 10.28 9.22 10.17 9.3 10.03C9.38 9.89 9.34 9.76 9.28 9.64C9.22 9.52 8.77 8.38 8.58 7.93C8.4 7.48 8.21 7.55 8.07 7.55C7.94 7.55 7.77 7.55 7.6 7.55H7.43C7.26 7.55 6.95 7.64 6.69 7.92C6.44 8.2 5.93 8.76 5.93 9.9C5.93 11.04 6.71 12.11 6.85 12.28C6.99 12.45 8.71 14.99 11.2 16.12C13.68 17.26 14.21 16.97 14.71 16.91C15.22 16.84 16.14 16.3 16.35 15.72C16.56 15.14 16.56 14.65 16.48 14.45L16.56 14.45Z" />
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
      <div className="border-t py-2" style={{ backgroundColor: '#243878' }}>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 text-sm text-white/80 gap-4">
          <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Gorilla Tech Solutions. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ backgroundColor: '#f2f5f7', color: 'black' }}>
                <Image src="https://placehold.co/24x24.png" alt="Meta Business" width={24} height={24} data-ai-hint="logo" />
                <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">Meta Business</span>
                    <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-muted-foreground">Verified Partner</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-black" style={{ backgroundColor: '#f0f4f6' }}>
                <Image src="https://placehold.co/24x24.png" alt="AWS Startup" width={24} height={24} data-ai-hint="logo" />
                <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">AWS Startup</span>
                    <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-muted-foreground">Verified Partner</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-black" style={{ backgroundColor: '#f0f4f6' }}>
                <Image src="https://placehold.co/24x24.png" alt="ISO 9001:2015" width={24} height={24} data-ai-hint="certificate" />
                <div className="flex flex-col items-start text-left">
                    <span className="font-semibold text-sm">ISO 9001:2015</span>
                    <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-muted-foreground">Trusted</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
