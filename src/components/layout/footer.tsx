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
      <div className="border-t" style={{ backgroundColor: '#243878' }}>
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 px-4 sm:px-6 lg:px-8 text-sm text-white/80 gap-4">
          <p>&copy; {new Date().getFullYear()} Gorilla Tech Solutions. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex flex-col items-center">
                <Button asChild size="sm" className="bg-[#faf7f7] text-black hover:bg-gray-200 shadow-lg transition-transform transform hover:scale-105 text-xs">
                    <Link href="#" className="flex items-center gap-2">
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current"><title>Meta</title><path d="M12.001.001C5.373.001 0 5.374 0 12.001s5.373 12 12.001 12S24 18.628 24 12.001C24 5.374 18.628.001 12.001.001ZM12 21.6A9.6 9.6 0 1 1 21.6 12a9.611 9.611 0 0 1-9.6 9.6Zm2.484-9.743c.1-.417.156-.84.156-1.275 0-1.802-1.21-3.265-2.69-3.265-1.479 0-2.688 1.463-2.688 3.265 0 .435.056.858.156 1.275-.24.035-.47.053-.69.053-1.48 0-2.69-1.463-2.69-3.265S8.573 5.32 10.052 5.32c1.48 0 2.69 1.463 2.69 3.265a3.24 3.24 0 0 1-.133 1.053c.27-.035.54-.053.801-.053 1.48 0 2.69 1.463 2.69 3.265 0 1.803-1.21 3.265-2.69 3.265-1.48 0-2.69-1.462-2.69-3.265a3.24 3.24 0 0 1 .133-1.053c-.27.035-.54.053-.801-.053C8.573 14.547 7.363 16.01 7.363 17.81c0 1.803 1.21 3.265 2.69 3.265 1.478 0 2.688-1.462 2.688-3.265a3.24 3.24 0 0 0-.156-1.275c.24-.035.47-.053.69-.053 1.48 0 2.69-1.463 2.69-3.265S15.962 8.857 14.484 8.857Z"/></svg>
                        <div className="flex flex-col">
                            <span className="font-bold text-base" style={{color: '#0082fb'}}>Meta Business</span>
                            <span className="text-xs -mt-1" style={{color: 'limegreen'}}>Verified Partner</span>
                        </div>
                    </Link>
                </Button>
            </div>
             <Button asChild size="sm" className="bg-[#faf7f7] text-black hover:bg-gray-200 shadow-lg transition-transform transform hover:scale-105 text-xs">
                <Link href="#" className="flex items-center gap-2">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-[#FF9900]"><title>Amazon AWS</title><path d="M12.484 14.168h-2.12c-1.284 0-2.05-.62-2.05-1.932 0-1.34 1.05-1.92 2.38-1.92s1.948.336 2.532.588l.216-1.596c-.672-.3-1.848-.684-3.252-.684-2.196 0-3.924 1.344-3.924 3.564 0 2.472 1.8 3.516 3.84 3.516h2.484l-.12 1.092h-2.316c-2.436 0-3.516 1.416-3.516 3.168 0 1.56.984 2.916 2.916 2.916 1.38 0 2.412-.42 3.036-.78l.204-1.608c-.684.348-1.632.6-2.676.6-1.14 0-1.848-.684-1.848-1.788 0-1.176.792-1.764 1.944-1.764h2.244l-.12 1.08zM21.24 9.3c.312-1.356.444-2.424.444-3.132 0-.828-.276-1.536-.924-1.536-.636 0-1.032.588-1.032 1.356 0 .744.204 1.836.432 2.892l-1.848 7.392h2.22l.6-2.46c.264.036.528.06.792.06.864 0 1.524-.432 1.74-1.2l.624-2.436c.156-.636.084-1.344-.108-1.92zM21.6 11.23c-.156.636-.672 1.044-1.296 1.044-.228 0-.456-.024-.684-.06l.576-2.328c.192-.024.408-.036.6-.036.636 0 1.02.48 1.152 1.044l-.348.336zM0 13.945c.31-1.356.443-2.424.443-3.132 0-.828-.275-1.536-.923-1.536-.636 0-1.032.588-1.032 1.356 0 .744.204 1.836.432 2.892l-1.848 7.392h2.22l.6-2.46c.264.036.528.06.792.06.864 0 1.524-.432 1.74-1.2l.624-2.436c.156-.636.084-1.344-.108-1.92zm.36 2.053c-.156.636-.672 1.044-1.296 1.044-.228 0-.456-.024-.684-.06l.576-2.328c.192-.024.408-.036.6-.036.636 0 1.02.48 1.152 1.044l-.348.336z"/></svg>
                    <div className="flex flex-col">
                        <span className="font-bold text-base" style={{color: '#FCC200'}}>AWS Startup</span>
                        <span className="text-xs -mt-1" style={{color: 'limegreen'}}>Verified Partner</span>
                    </div>
                </Link>
            </Button>
            <Button asChild size="sm" className="bg-[#faf7f7] text-black hover:bg-gray-200 shadow-lg transition-transform transform hover:scale-105 text-xs">
                <Link href="#">ISO 9001:2015</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
