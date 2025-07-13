
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Apps',
  description: 'Discover the innovative applications built by Gorilla Tech Solutions.',
};

const apps = [
  {
    title: 'Analytics Dashboard',
    description: 'A powerful tool to track your website performance and gain valuable insights.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'data analytics',
    link: '#',
  },
  {
    title: 'Social Media Scheduler',
    description: 'Plan and automate your social media posts across all platforms with ease.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'social media',
    link: '#',
  },
    {
    title: 'SEO Keyword Finder',
    description: 'Discover the best keywords to target for your business and improve your search rankings.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'seo keyword',
    link: '#',
  },
];

export default function AppsPage() {
  return (
    <div className="container py-12 md:py-20">
      <header className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Applications</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the custom applications we've developed to help businesses like yours succeed.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apps.map((app) => (
          <Card key={app.title} className="flex flex-col overflow-hidden group">
            <div className="overflow-hidden">
              <Image
                src={app.image}
                alt={app.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={app.dataAiHint}
                loading="lazy"
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline">{app.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription>{app.description}</CardDescription>
            </CardContent>
            <CardContent>
              <Button asChild variant="outline">
                <Link href={app.link}>
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
