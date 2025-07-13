
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Star, ArrowRight, Smartphone, AppStore, Globe } from 'lucide-react';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Our Innovative Applications | Gorilla Tech Solutions',
  description: 'Explore a portfolio of powerful and intuitive applications built by Gorilla Tech Solutions. Discover tools for productivity, marketing, analytics, and more, available on various platforms.',
};

const apps = [
  {
    title: 'Analytics Dashboard',
    category: 'Business',
    rating: 4.8,
    downloads: '1M+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'analytics chart',
    links: { web: '#' }
  },
  {
    title: 'Social Scheduler',
    category: 'Productivity',
    rating: 4.7,
    downloads: '500K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'calendar social',
    links: { playStore: '#', appStore: '#' }
  },
  {
    title: 'SEO Keyword Finder',
    category: 'Marketing',
    rating: 4.9,
    downloads: '250K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'seo keyword',
    links: { web: '#' }
  },
  {
    title: 'Project Pilot',
    category: 'Productivity',
    rating: 4.6,
    downloads: '750K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'project management',
    links: { playStore: '#', appStore: '#', web: '#' }
  },
  {
    title: 'Content Crafter AI',
    category: 'AI Tools',
    rating: 4.8,
    downloads: '300K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'ai writing',
    links: { web: '#' }
  },
  {
    title: 'Lead Gen Bot',
    category: 'Marketing',
    rating: 4.5,
    downloads: '100K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'robot chat',
    links: { download: '#' }
  },
  {
    title: 'E-com Insights',
    category: 'Business',
    rating: 4.7,
    downloads: '400K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'ecommerce analytics',
    links: { playStore: '#', appStore: '#' }
  },
  {
    title: 'Team Sync',
    category: 'Communication',
    rating: 4.6,
    downloads: '1.2M+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'team chat',
    links: { playStore: '#', appStore: '#', web: '#' }
  },
  {
    title: 'Invoice Master',
    category: 'Finance',
    rating: 4.9,
    downloads: '600K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'invoice document',
    links: { download: '#' }
  },
    {
    title: 'Ad Optimizer',
    category: 'Marketing',
    rating: 4.8,
    downloads: '150K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'digital advertising',
    links: { web: '#' }
  },
  {
    title: 'Code Snippets',
    category: 'Developer Tools',
    rating: 4.9,
    downloads: '800K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'code editor',
    links: { download: '#' }
  },
  {
    title: 'Fit Tracker',
    category: 'Health & Fitness',
    rating: 4.7,
    downloads: '2M+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'fitness tracking',
    links: { playStore: '#', appStore: '#' }
  },
  {
    title: 'Mindful Moments',
    category: 'Health & Fitness',
    rating: 4.8,
    downloads: '900K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'meditation calm',
    links: { playStore: '#', appStore: '#' }
  },
  {
    title: 'Expense Tracker',
    category: 'Finance',
    rating: 4.6,
    downloads: '1.5M+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'finance chart',
    links: { playStore: '#', appStore: '#' }
  },
  {
    title: 'Event Planner Pro',
    category: 'Productivity',
    rating: 4.7,
    downloads: '350K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'event calendar',
    links: { web: '#' }
  },
  {
    title: 'Language Leap',
    category: 'Education',
    rating: 4.8,
    downloads: '1.8M+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'language learning',
    links: { playStore: '#', appStore: '#' }
  },
  {
    title: 'Secure Vault',
    category: 'Security',
    rating: 4.9,
    downloads: '1M+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'security vault',
    links: { download: '#', playStore: '#' }
  },
  {
    title: 'Creative Canvas',
    category: 'Art & Design',
    rating: 4.7,
    downloads: '650K+',
    icon: 'https://placehold.co/128x128.png',
    dataAiHint: 'digital art',
    links: { web: '#', appStore: '#' }
  }
];

const PlayStoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg>
);

const AppStoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-apple"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
);


export default function AppsPage() {
  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Our Suite of Applications</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover powerful, intuitive, and beautifully designed applications to enhance your productivity, streamline workflows, and drive business growth.
          </p>
          <div className="mt-8 flex justify-center gap-4">
              <Image src="https://placehold.co/150x50.png" alt="Get it on Google Play" width={150} height={50} data-ai-hint="google play" />
              <Image src="https://placehold.co/150x50.png" alt="Download on the App Store" width={150} height={50} data-ai-hint="app store" />
          </div>
        </div>
      </section>

      {/* Apps Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {apps.map((app) => (
              <Card key={app.title} className="flex flex-col overflow-hidden group border-border/80 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-start gap-4 p-4">
                    <Image
                        src={app.icon}
                        alt={`${app.title} icon`}
                        width={64}
                        height={64}
                        className="rounded-xl border"
                        data-ai-hint={app.dataAiHint}
                        loading="lazy"
                    />
                    <div className="flex-1">
                        <CardTitle className="font-headline text-lg mb-1">{app.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{app.category}</p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>{app.rating}</span>
                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                            <span className="text-xs">({app.downloads})</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2">
                    {app.links.playStore && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link href={app.links.playStore} target="_blank" rel="noopener noreferrer">
                                <PlayStoreIcon />
                            </Link>
                        </Button>
                    )}
                    {app.links.appStore && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link href={app.links.appStore} target="_blank" rel="noopener noreferrer">
                                <AppStoreIcon />
                            </Link>
                        </Button>
                    )}
                    {app.links.web && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link href={app.links.web} target="_blank" rel="noopener noreferrer">
                                <Globe />
                            </Link>
                        </Button>
                    )}
                    {app.links.download && (
                         <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link href={app.links.download} download>
                                <Download />
                            </Link>
                        </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
       <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Have a Project in Mind?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Let's turn your idea into a powerful application. Our expert team is ready to build the perfect solution for your business needs.
              </p>
              <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/contact">
                      Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
