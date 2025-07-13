
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { AppsList } from '@/components/apps-list';

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
            <AppsList allApps={apps} />
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
