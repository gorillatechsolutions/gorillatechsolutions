
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Search, MousePointerClick, Share2, FileText, Mail, BarChart3, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Our Digital Marketing Services',
    description: 'We offer a full suite of digital marketing services, including SEO, PPC, social media marketing, content creation, and email marketing to grow your business.',
};

const services = [
  {
    icon: <Search className="h-10 w-10 text-accent" />,
    title: 'Search Engine Optimization (SEO)',
    description: 'Boost your organic visibility and climb the search rankings. We use proven strategies to drive qualified traffic to your website.'
  },
  {
    icon: <MousePointerClick className="h-10 w-10 text-accent" />,
    title: 'Pay-Per-Click (PPC) Advertising',
    description: 'Get immediate results with targeted ad campaigns on Google, Bing, and social platforms. Maximize your ROI with our expert management.'
  },
  {
    icon: <Share2 className="h-10 w-10 text-accent" />,
    title: 'Social Media Marketing',
    description: 'Engage your audience and build a loyal community. We create and manage social media campaigns that resonate with your customers.'
  },
  {
    icon: <FileText className="h-10 w-10 text-accent" />,
    title: 'Content Creation & Marketing',
    description: 'From compelling blog posts to captivating videos, we produce high-quality content that tells your story and drives engagement.'
  },
  {
    icon: <Mail className="h-10 w-10 text-accent" />,
    title: 'Email Marketing & Automation',
    description: 'Nurture leads and retain customers with personalized email campaigns. We design, write, and manage emails that convert.'
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-accent" />,
    title: 'Analytics & Performance Reporting',
    description: 'Understand what\'s working and what\'s not. We provide clear, actionable reports to guide your marketing decisions.'
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-secondary/30">
        <div className="container py-12 md:py-20">
        <header className="text-center mb-16">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Services</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive suite of digital marketing services designed to elevate your brand and accelerate growth.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
            <Card key={service.title} className="flex flex-col md:flex-row items-start gap-6 p-6 bg-card rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <div className="p-3 bg-accent/10 rounded-full flex-shrink-0 mt-1">
                    {service.icon}
                </div>
                <div className="flex-1">
                    <CardTitle className="font-headline text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                </div>
            </Card>
            ))}
        </div>

        <div className="mt-16 text-center">
            <h2 className="font-headline text-3xl font-bold text-primary">Ready to Grow Your Business?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Let's discuss how our digital marketing expertise can help you achieve your business goals. Your journey to digital excellence starts here.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                <Link href="/contact">
                    Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
        </div>
    </div>
  );
}
