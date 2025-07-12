import Link from 'next/link';
import { BotMessageSquare, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Github, MessageCircle } from 'lucide-react';
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
          <div className="flex gap-4 mt-2">
            <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-social-facebook hover:opacity-80 transition-opacity" /></Link>
            <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-social-twitter hover:opacity-80 transition-opacity" /></Link>
            <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-social-instagram hover:opacity-80 transition-opacity" /></Link>
            <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-social-linkedin hover:opacity-80 transition-opacity" /></Link>
            <Link href="#" aria-label="WhatsApp"><MessageCircle className="h-5 w-5 text-social-whatsapp hover:opacity-80 transition-opacity" /></Link>
          </div>
        </div>

        {/* Column 2: Links */}
        <div className="lg:text-center">
          <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col items-center justify-center space-y-2">
            <li className='flex items-center space-x-4'>
                {footerLinks.company.map((link, index) => (
                  <div key={link.name} className="flex items-center">
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                      {link.name}
                    </Link>
                    {index < footerLinks.company.length - 1 && <span className="mx-2 text-muted-foreground">&bull;</span>}
                  </div>
                ))}
            </li>
            <li className='flex items-center space-x-4'>
                {footerLinks.about.map((link, index) => (
                    <div key={link.name} className="flex items-center">
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                        {link.name}
                    </Link>
                    {index < footerLinks.about.length - 1 && <span className="mx-2 text-muted-foreground">&bull;</span>}
                    </div>
                ))}
            </li>
            <li className='flex items-center space-x-4'>
                {footerLinks.legal.map((link, index) => (
                    <div key={link.name} className="flex items-center">
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                        {link.name}
                    </Link>
                    {index < footerLinks.legal.length - 1 && <span className="mx-2 text-muted-foreground">&bull;</span>}
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